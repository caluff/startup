'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createPitch } from '@/lib/actions'
import { formSchema } from '@/lib/validation'
import MDEditor from '@uiw/react-md-editor'
import { Loader2, Send, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { z } from 'zod'

export const StartupForm = () => {
  const [pitch, setPitch] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [poster, setPoster] = useState<File | undefined>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPoster(file)
      const previewUrl = URL.createObjectURL(file)
      setImageUrl(previewUrl)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setImageUrl('')
    setPoster(undefined)
  }

  const handleFormSubmit = async (prevState: any, formDataObj: FormData) => {
    let posterResponse = null

    try {
      if (poster) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', poster as File)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const result = await response.json()
        posterResponse = result.result
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const formValues = {
        title: formDataObj.get('title') as string,
        description: formDataObj.get('description') as string,
        category: formDataObj.get('category') as string,
        email: formDataObj.get('email') as string,
        phone: formDataObj.get('phone') as string,
        link: (formDataObj.get('link') as string) ?? '',
        website: (formDataObj.get('website') as string) ?? '',
        pitch,
      }

      await formSchema.parseAsync(formValues)
      const result = await createPitch(prevState, formDataObj, pitch, posterResponse)
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
      return {
        error: 'An unexpected error has occurred',
        status: 'ERROR',
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  })

  return (
    <form
      action={formAction}
      className="max-w-6xl mx-auto bg-gradient-to-b from-white to-gray-50 my-16 rounded-3xl shadow-2xl p-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Submit Your Startup Pitch</h1>
        <p className="text-gray-600 mt-3 text-lg">Share your innovative idea with the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Name
            </label>
            <Input
              id="title"
              name="title"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg py-6"
              required
              placeholder="Enter your startup name"
            />
            {errors.title && <p className="text-red-500 text-base mt-2">{errors.title}</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg py-6"
              required
              placeholder="Enter the email to contact you"
            />
            {errors.email && <p className="text-red-500 text-base mt-2">{errors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg py-6"
              placeholder="Enter your phone number (optional)"
            />
            {errors.phone && <p className="text-red-500 text-base mt-2">{errors.phone}</p>}
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Website
            </label>
            <Input
              id="website"
              name="website"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg py-6"
              placeholder="Enter your website URL (optional)"
            />
            {errors.website && <p className="text-red-500 text-base mt-2">{errors.website}</p>}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Category
            </label>
            <Input
              id="category"
              name="category"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg py-6"
              required
              placeholder="e.g. Tech, Health, Education"
            />
            {errors.category && <p className="text-red-500 text-base mt-2">{errors.category}</p>}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[160px] text-lg"
              required
              placeholder="Brief overview of your startup"
            />
            {errors.description && (
              <p className="text-red-500 text-base mt-2">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3">
              Startup Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block text-center">
                  {imageUrl ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-w-full h-auto mx-auto rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-base text-gray-500">Click to change image</p>
                      <p className="text-sm text-gray-400">Selected: {poster?.name}</p>
                    </div>
                  ) : (
                    <div className="py-12 space-y-4">
                      <Upload className="mx-auto h-16 w-16 text-gray-400" />
                      <p className="text-gray-600 font-medium text-lg">Click to upload an image</p>
                      <p className="text-base text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            {errors.link && <p className="text-red-500 text-base mt-2">{errors.link}</p>}
          </div>

          <div data-color-mode="light">
            <label
              htmlFor="pitch"
              className="block text-base font-medium text-gray-700 uppercase tracking-wider mb-3"
            >
              Detailed Pitch
            </label>
            <MDEditor
              value={pitch}
              onChange={(value) => setPitch(value as string)}
              id="pitch"
              preview="edit"
              height={400}
              className="rounded-xl overflow-hidden border-2 border-gray-300 focus-within:border-primary transition-colors"
              textareaProps={{
                placeholder: 'Describe your idea and the problem it solves...',
              }}
              previewOptions={{ disallowedElements: ['style'] }}
            />
            {errors.pitch && <p className="text-red-500 text-base mt-2">{errors.pitch}</p>}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Your Pitch
              <Send className="w-6 h-6" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
