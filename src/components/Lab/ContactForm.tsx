'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getClientSideURL } from '@/utilities/getURL'

type ContactFormValues = {
  'full-name': string
  email: string
  phone?: string
  message: string
}

type LabContactFormProps = {
  formId?: number | string | null
}

export function LabContactForm({ formId }: LabContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = useCallback(
    async (data: ContactFormValues) => {
      setError(null)
      setIsLoading(true)

      try {
        if (formId) {
          const submissionData = Object.entries(data).map(([field, value]) => ({
            field,
            value: value ?? '',
          }))

          const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formId,
              submissionData,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          if (!response.ok) {
            throw new Error('Unable to submit the form. Please email us directly.')
          }
        } else {
          const mailto = `mailto:amir.shmuel@mcgill.ca?subject=${encodeURIComponent(
            `Website inquiry from ${data['full-name']}`,
          )}&body=${encodeURIComponent(
            `Name: ${data['full-name']}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\n${data.message}`,
          )}`
          window.location.href = mailto
        }

        setHasSubmitted(true)
        reset()
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Something went wrong.')
      } finally {
        setIsLoading(false)
      }
    },
    [formId, reset],
  )

  if (hasSubmitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-6">
        <h3 className="mb-2 text-lg font-semibold">Thank you for reaching out</h3>
        <p className="text-muted-foreground">
          Your message has been sent. We will get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="full-name">Full name</Label>
        <Input
          id="full-name"
          {...register('full-name', { required: 'Please enter your name.' })}
          className="mt-2"
        />
        {errors['full-name'] && (
          <p className="mt-1 text-sm text-error">{errors['full-name'].message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Please enter your email address.' })}
          className="mt-2"
        />
        {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" type="tel" {...register('phone')} className="mt-2" />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          {...register('message', { required: 'Please enter a message.' })}
          className="mt-2"
        />
        {errors.message && <p className="mt-1 text-sm text-error">{errors.message.message}</p>}
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <Button disabled={isLoading} type="submit">
        {isLoading ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
