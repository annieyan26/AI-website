import { getPayload } from 'payload'
import configPromise from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../../.env') })

const ORCID_ID = '0000-0003-3028-6639'

async function syncOrcid() {
  const payload = await getPayload({ config: configPromise })
  
  console.log(`Fetching works for ORCID: ${ORCID_ID}...`)
  
  const response = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
    headers: {
      Accept: 'application/json',
    },
  })
  
  if (!response.ok) {
    console.error(`Failed to fetch from ORCID API: ${response.status} ${response.statusText}`)
    process.exit(1)
  }
  
  const data = await response.json()
  const works = data.group || []
  
  console.log(`Found ${works.length} works. Syncing to Payload...`)
  
  let added = 0
  let skipped = 0
  
  for (const group of works) {
    // Usually the first summary contains the most accurate information
    const summary = group['work-summary']?.[0]
    if (!summary) continue
    
    const putCode = summary['put-code']?.toString()
    if (!putCode) continue
    
    // Check if it exists
    const existing = await payload.find({
      collection: 'publications',
      where: {
        orcidPutCode: {
          equals: putCode,
        },
      },
    })
    
    if (existing.totalDocs > 0) {
      skipped++
      continue
    }
    
    const title = summary.title?.title?.value || 'Untitled'
    let type = 'other'
    const orcidType = summary.type
    if (orcidType === 'journal-article') type = 'journal-article'
    else if (orcidType === 'conference-paper') type = 'conference-paper'
    else if (orcidType === 'book-chapter') type = 'book-chapter'
    else if (orcidType === 'book') type = 'book'
    else if (orcidType === 'preprint') type = 'preprint'
    
    const journalTitle = summary['journal-title']?.value || ''
    const year = summary['publication-date']?.year?.value || ''
    
    let doi = ''
    let url = summary.url?.value || ''
    
    const externalIds = summary['external-ids']?.['external-id'] || []
    for (const extId of externalIds) {
      if (extId['external-id-type'] === 'doi') {
        doi = extId['external-id-value']
        if (!url && extId['external-id-url']?.value) {
          url = extId['external-id-url'].value
        }
      }
    }
    
    try {
      await payload.create({
        collection: 'publications',
        data: {
          title,
          type: type as any,
          journalTitle,
          year,
          doi,
          url,
          orcidPutCode: putCode,
          authors: 'Amir Shmuel', // Default author based on profile
          _status: 'published',
        },
      })
      added++
      console.log(`Added: ${title}`)
    } catch (err) {
      console.error(`Error adding publication ${putCode}:`, err)
    }
  }
  
  console.log(`Sync complete! Added: ${added}, Skipped (already exist): ${skipped}`)
  process.exit(0)
}

syncOrcid().catch((err) => {
  console.error('Unhandled error during sync:', err)
  process.exit(1)
})
