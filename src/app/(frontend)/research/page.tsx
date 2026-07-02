import type { Metadata } from 'next'
import { LabResearchPage } from '@/components/Lab/ResearchPage'
import { LAB_SHORT_NAME, SITE_DESCRIPTION } from '@/constants/lab'

export default function ResearchPage() {
  return <LabResearchPage />
}

export function generateMetadata(): Metadata {
  return {
    title: `Research | ${LAB_SHORT_NAME}`,
    description: SITE_DESCRIPTION,
  }
}
