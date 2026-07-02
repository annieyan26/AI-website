import type { Metadata } from 'next'
import { LabContactPage } from '@/components/Lab/ContactPage'
import { LAB_SHORT_NAME, SITE_DESCRIPTION } from '@/constants/lab'

export default function ContactPage() {
  return <LabContactPage />
}

export function generateMetadata(): Metadata {
  return {
    title: `Contact | ${LAB_SHORT_NAME}`,
    description: SITE_DESCRIPTION,
  }
}
