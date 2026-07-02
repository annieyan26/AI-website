import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Research laboratory of Dr. Amir Shmuel at The Neuro, McGill University. Visual systems neuroscience and brain imaging signals.',
  images: [
    {
      url: `${getServerSideURL()}/logo.svg`,
    },
  ],
  siteName: 'VSNBIS Lab',
  title: 'Lab of Visual Systems Neuroscience and Brain Imaging Signals',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
