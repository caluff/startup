import { writeClient } from '@/sanity/lib/write-client'
import fs from 'fs'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { basename, join } from 'path'
// Allowed file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: Request) {
  let tempFilePath: string | null = null

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public/uploads')
    await mkdir(uploadsDir, { recursive: true })

    // Create temporary file with safe name
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${Date.now()}-${safeFileName}`
    tempFilePath = join(uploadsDir, filename)

    await writeFile(tempFilePath, buffer)

    // Upload to Sanity
    const fileBuffer = await fs.promises.readFile(tempFilePath)
    const result = await writeClient.assets.upload('image', fileBuffer, {
      filename: basename(tempFilePath),
    })

    // Clean up temporary file
    await unlink(tempFilePath)
    tempFilePath = null

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: result.url,
      result,
    })
  } catch (error) {
    // Clean up temporary file if it exists
    if (tempFilePath) {
      try {
        await unlink(tempFilePath)
      } catch (cleanupError) {
        console.error('Error cleaning up temporary file:', cleanupError)
      }
    }

    console.error('Error uploading file:', error)

    return NextResponse.json(
      {
        error: 'Error uploading file',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
