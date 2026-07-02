import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  LAB_NAME,
  LAB_TAGLINE,
  PI,
  RESEARCH_DESCRIPTION,
  RESEARCH_GOALS,
  RESEARCH_METHODS,
} from '@/constants/lab'

export function LabHomePage() {
  return (
    <article>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
        </div>
        <div className="container relative grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
              The Neuro · McGill University
            </p>
            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-5xl">{LAB_NAME}</h1>
            <p className="mb-8 text-lg text-slate-300 md:text-xl">{LAB_TAGLINE}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
                href="/research"
              >
                Explore our research
              </Link>
              <Link
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                href="/contact"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              alt="Brain imaging and visual neuroscience research"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="https://www.mcgill.ca/bic/files/bic/vsnbis.jpg"
            />
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-semibold">Research focus</h2>
          <p className="text-lg text-muted-foreground">{RESEARCH_DESCRIPTION}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {RESEARCH_GOALS.map((goal) => (
            <div
              key={goal.title}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <h3 className="mb-3 text-xl font-semibold text-primary">{goal.title}</h3>
              <p className="text-muted-foreground">{goal.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="mb-6 text-3xl font-semibold">Methods &amp; techniques</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {RESEARCH_METHODS.map((method) => (
                <li
                  key={method}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">Principal Investigator</p>
            <h3 className="mb-3 text-2xl font-semibold">{PI.name}</h3>
            <p className="mb-2 text-muted-foreground">{PI.title}</p>
            <ul className="mb-6 space-y-1 text-sm text-muted-foreground">
              {PI.affiliations.map((affiliation) => (
                <li key={affiliation}>{affiliation}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                className="text-sm font-medium text-primary hover:underline"
                href={PI.profileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Neuro profile
              </Link>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                href={PI.googleScholar}
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Scholar
              </Link>
              <Link className="text-sm font-medium text-primary hover:underline" href="/publications">
                Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="rounded-3xl bg-slate-950 px-8 py-12 text-white md:px-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="mb-3 text-3xl font-semibold">Interested in joining or collaborating?</h2>
              <p className="max-w-2xl text-slate-300">
                We welcome inquiries from prospective students, postdoctoral fellows, and collaborators
                interested in visual neuroscience, neuroimaging, and computational approaches to brain signals.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
              href="/contact"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
