'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createPitch } from '@/lib/actions'
import { formSchema } from '@/lib/validation'
import MDEditor from '@uiw/react-md-editor'
import { Send, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { z } from 'zod'

export const StartupForm = () => {
  const [pitch, setPitch] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [poster, setPoster] = useState<File | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setPoster(file)
  }

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    let posterResponse = null

    try {
      if (poster) {
        const formData = new FormData()
        formData.append('file', poster as File)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()
        posterResponse = result.result
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: (formData.get('link') as string) ?? '',
        pitch,
      }
      await formSchema.parseAsync(formValues)
      const result = await createPitch(prevState, formData, pitch, posterResponse)
      if (result.status === 'SUCCESS') {
        toast({
          title: 'Success',
          description: 'Your startup pitch has been created successfully',
        })
        router.push(`/startup/${result._id}`)
      }

      return result
    } catch (error) {
      console.log(error)

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        setErrors(fieldErrors as unknown as Record<string, string>)
        toast({
          title: 'Error',
          description: 'Please check your inputs and try again',
          variant: 'destructive',
        })
        return { error: 'Validation failed', status: 'ERROR' }
      }
      toast({
        title: 'Error',
        description: 'An unexpected error has occurred',
        variant: 'destructive',
      })
      return { error: 'An unexpected error has occurred', status: 'ERROR' }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  })

  return (
    <form action={formAction} className={'max-w-2xl mx-auto bg-white my-10 space-y-8 px-6'}>
      <div>
        <label htmlFor={'title'} className={'font-bold text-[18px] text-black uppercase'}>
          Title
        </label>
        <Input
          id={'title'}
          name={'title'}
          className={
            'border-[3px]! border-black! px-5! py-7! text-[18px]! text-black! font-semibold! rounded-full! mt-3! placeholder:text-black-300!'
          }
          required
          placeholder={'Startup Title'}
        />
        {errors.title && <p className={'text-red-500 mt-2 ml-5'}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor={'description'} className={'font-bold text-[18px] text-black uppercase'}>
          Description
        </label>
        <Textarea
          id={'description'}
          name={'description'}
          className={
            'border-[3px]! border-black! p-5! text-[18px]! text-black! font-semibold! rounded-[20px]! mt-3! placeholder:text-black-300!'
          }
          required
          placeholder={'Startup Description'}
        />
        {errors.description && <p className={'text-red-500 mt-2 ml-5'}>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor={'category'} className={'font-bold text-[18px] text-black uppercase'}>
          Category
        </label>
        <Input
          id={'category'}
          name={'category'}
          className={'startup-form_input'}
          required
          placeholder={'Startup Category (Tech, Health, Education...)'}
        />
        {errors.category && <p className={'text-red-500 mt-2 ml-5'}>{errors.category}</p>}
      </div>

      <div>
        <label className={'font-bold text-[18px] text-black uppercase'}>Upload Image</label>
        <div className="border-[3px] border-black rounded-[20px] mt-3 p-4">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block p-4 hover:bg-gray-50 transition-colors text-center"
            >
              {imageUrl ? (
                <div className="space-y-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full h-auto mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-sm text-gray-400">Supported formats: PNG, JPG, GIF</p>
                </div>
              )}
            </label>
            {uploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <p className="text-primary font-semibold">Uploading...</p>
              </div>
            )}
          </div>
        </div>
        {errors.link && <p className={'text-red-500 mt-2 ml-5'}>{errors.link}</p>}
      </div>

      <div data-color-mode={'light'}>
        <label htmlFor={'pitch'} className={'font-bold text-[18px] text-black uppercase'}>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id={'pitch'}
          preview={'edit'}
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{ placeholder: 'Briefly describe your idea and what problem it solvers' }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
        {errors.pitch && <p className={'text-red-500 mt-2 ml-5'}>{errors.pitch}</p>}
      </div>

      <Button
        type={'submit'}
        disabled={isPending}
        className={
          'bg-primary! border-[4px]! border-black! rounded-full! p-5! min-h-[70px]! w-full! font-bold! text-[18px]! text-white'
        }
      >
        {isPending ? 'Submitting...' : 'Submit your pitch'}
        <Send className={'size-6 ml-2'} />
      </Button>
    </form>
  )
}
