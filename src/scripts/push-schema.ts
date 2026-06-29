/**
 * Syncs the Payload/Drizzle schema to the database before production builds.
 *
 * Drizzle push only runs when NODE_ENV !== 'production', so the build script
 * invokes this with NODE_ENV=development. Required after schema changes such
 * as adding the publications collection or archive block relationships.
 */
import { getPayload } from 'payload'

import configPromise from '../payload.config'

async function pushSchema() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Database schema synced successfully')
  await payload.destroy()
}

pushSchema().catch((error) => {
  console.error('Failed to sync database schema:', error)
  process.exit(1)
})
