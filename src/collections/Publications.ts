import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Publications: CollectionConfig<'publications'> = {
  slug: 'publications',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'year', 'journalTitle', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Journal Article', value: 'journal-article' },
        { label: 'Conference Paper', value: 'conference-paper' },
        { label: 'Book Chapter', value: 'book-chapter' },
        { label: 'Book', value: 'book' },
        { label: 'Preprint', value: 'preprint' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'journalTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'text',
      defaultValue: 'Amir Shmuel',
    },
    {
      name: 'doi',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'orcidPutCode',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
