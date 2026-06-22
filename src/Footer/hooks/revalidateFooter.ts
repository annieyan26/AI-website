import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    try {
      revalidateTag('global_footer', 'max')
    } catch (err) {
      payload.logger.warn(`Error revalidating footer: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return doc
}
