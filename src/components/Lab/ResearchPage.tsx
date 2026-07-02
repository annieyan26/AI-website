import Link from 'next/link'
import React from 'react'
import {
  PI,
  RESEARCH_DESCRIPTION,
  RESEARCH_GOALS,
  RESEARCH_METHODS,
} from '@/constants/lab'

export function LabResearchPage() {
  return (
    <article className="pt-24 pb-24">
      <div className="container mb-16 max-w-4xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Research</p>
        <h1 className="mb-6 text-4xl font-semibold md:text-5xl">Visual systems neuroscience &amp; brain imaging signals</h1>
        <p className="text-lg text-muted-foreground">{RESEARCH_DESCRIPTION}</p>
      </div>

      <div className="container mb-20 grid gap-6 md:grid-cols-2">
        {RESEARCH_GOALS.map((goal, index) => (
          <div key={goal.title} className="rounded-2xl border border-border bg-card p-8">
            <p className="mb-3 text-sm font-semibold text-primary">Goal {index + 1}</p>
            <h2 className="mb-4 text-2xl font-semibold">{goal.title}</h2>
            <p className="text-muted-foreground">{goal.description}</p>
          </div>
        ))}
      </div>

      <div className="border-y border-border bg-muted/30 py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-semibold">Experimental approaches</h2>
            <p className="mb-8 text-muted-foreground">
              Our integrative approach combines techniques that span multiple levels of spatial and temporal
              resolution, allowing us to relate large-scale imaging signals to local neuronal activity.
            </p>
            <ul className="space-y-3">
              {RESEARCH_METHODS.map((method) => (
                <li
                  key={method}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold">Selected research themes</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>Neurovascular coupling and the neuronal basis of fMRI signals</li>
              <li>Resting-state functional connectivity and laminar neurophysiology</li>
              <li>High-resolution functional imaging at 7 Tesla</li>
              <li>Functional organization of early visual cortex</li>
              <li>AI-based analysis of neuroimaging datasets</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container pt-20">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">Principal Investigator: {PI.name}</h2>
              <p className="text-muted-foreground">
                Dr. Shmuel directs the Brain Imaging Signals Lab at the McConnell Brain Imaging Centre and
                leads research on the mechanisms underlying functional brain imaging signals and visual
                cortical processing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                href="/publications"
              >
                View publications
              </Link>
              <Link
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                href="/contact"
              >
                Contact the lab
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
