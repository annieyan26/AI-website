import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PublicationsPage() {
  const payload = await getPayload({ config: configPromise })

  const publications = await payload.find({
    collection: 'publications',
    depth: 1,
    limit: 1000,
    sort: '-year',
    overrideAccess: false,
  })

  // Group by year
  const grouped = publications.docs.reduce((acc: any, pub) => {
    const year = pub.year || 'Unknown'
    if (!acc[year]) acc[year] = []
    acc[year].push(pub)
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Publications</h1>
          <p className="text-xl text-muted-foreground">
            Selected publications from the Lab of Visual Systems Neuroscience and Brain Imaging Signals,
            led by Dr. Amir Shmuel at The Neuro, McGill University.
          </p>
        </div>
      </div>

      <div className="container">
        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 pb-2 border-b border-border/50 text-foreground">{year}</h2>
            <div className="flex flex-col gap-6">
              {grouped[year].map((pub: any) => (
                <div 
                  key={pub.id} 
                  className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
                >
                  <h3 className="text-xl font-medium mb-2 text-foreground group-hover:text-primary transition-colors">
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  
                  <div className="text-base text-muted-foreground mb-3">
                    {pub.authors && <span className="font-medium mr-2">{pub.authors}.</span>}
                    {pub.journalTitle && <span className="italic mr-2">{pub.journalTitle}.</span>}
                    {pub.year && <span className="mr-2">{pub.year}.</span>}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider">
                      {pub.type?.replace('-', ' ')}
                    </span>
                    {pub.doi && (
                      <a 
                        href={`https://doi.org/${pub.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        DOI: {pub.doi}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Publications',
  }
}
