import { getPayload, createLocalReq } from 'payload'
import configPromise from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { seed } from '../endpoints/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../../.env') })

async function runSeed() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('Seeding database via script...')
  
  // Find a user or create a temporary request
  const usersResult = await payload.find({
    collection: 'users',
    limit: 1,
  })
  
  const user = usersResult.docs?.[0] || undefined
  if (!user) {
    console.log('Warning: No user found. Seeding without an authenticated user context...')
  } else {
    console.log(`Seeding with user context: ${user.email}`)
  }
  
  const req = await createLocalReq({ user }, payload)
  
  await seed({ payload, req })
  
  console.log('Seeding complete!')
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('Unhandled error during seed:', err)
  process.exit(1)
})
