import type { Metadata } from 'next'
import { LabHomePage } from '@/components/Lab/HomePage'
import { LAB_NAME, SITE_DESCRIPTION } from '@/constants/lab'

export default function HomePage() {
  return <LabHomePage />
}

export function generateMetadata(): Metadata {
  return {
    title: `${LAB_NAME} | The Neuro, McGill University`,
    description: SITE_DESCRIPTION,
  }
}
