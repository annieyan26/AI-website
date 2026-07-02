import Link from 'next/link'
import React from 'react'
import { LabContactForm } from '@/components/Lab/ContactForm'
import { CONTACT, LAB_NAME, PI } from '@/constants/lab'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function LabContactPage() {
  let formId: number | string | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const forms = await payload.find({
      collection: 'forms',
      limit: 1,
      overrideAccess: false,
      where: {
        title: {
          equals: 'Contact Form',
        },
      },
    })

    formId = forms.docs[0]?.id ?? null
  } catch {
    formId = null
  }

  return (
    <article className="pt-24 pb-24">
      <div className="container mb-16 max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Contact</p>
        <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Contact us</h1>
        <p className="text-lg text-muted-foreground">
          Reach out to the {LAB_NAME} with questions about research, collaboration, or joining the lab.
        </p>
      </div>

      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold">Lab location</h2>
            <address className="not-italic text-muted-foreground">
              <p>{CONTACT.address.line1}</p>
              <p>{CONTACT.address.line2}</p>
              <p>{CONTACT.address.line3}</p>
              <p>{CONTACT.address.city}</p>
              <p>{CONTACT.address.country}</p>
            </address>
            <Link
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              href={CONTACT.mapUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Google Maps
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold">Direct contact</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-medium text-foreground">Principal Investigator</dt>
                <dd className="text-muted-foreground">{PI.name}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Email</dt>
                <dd>
                  <a className="text-primary hover:underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Phone</dt>
                <dd className="text-muted-foreground">{CONTACT.phone}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Fax</dt>
                <dd className="text-muted-foreground">{CONTACT.fax}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-muted/40 p-8">
            <h2 className="mb-3 text-lg font-semibold">Institutional links</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                className="text-primary hover:underline"
                href="https://www.mcgill.ca/neuro/amir-shmuel-phd"
                rel="noopener noreferrer"
                target="_blank"
              >
                Dr. Shmuel at The Neuro
              </Link>
              <Link
                className="text-primary hover:underline"
                href="https://www.mcgill.ca/bic/research/visual-systems-neuroscience-brain-imaging-signals-shmuel"
                rel="noopener noreferrer"
                target="_blank"
              >
                McGill BIC lab page
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">Send a message</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Fill out the form below and we will respond as soon as possible.
          </p>
          <LabContactForm formId={formId} />
        </div>
      </div>
    </article>
  )
}
