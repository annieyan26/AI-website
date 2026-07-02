import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { DEFAULT_FOOTER_NAV } from '@/constants/lab'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const useDefaultNav =
    navItems.length === 0 ||
    navItems.some(({ link }) => link.label === 'Payload' || link.label === 'Source Code')

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Link className="flex items-center" href="/">
            <Logo className="brightness-0 invert" />
          </Link>
          <p className="max-w-sm text-sm text-white/70">
            Lab of Visual Systems Neuroscience and Brain Imaging Signals · The Neuro, McGill University
          </p>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {useDefaultNav
              ? DEFAULT_FOOTER_NAV.map((item) => (
                  <Link
                    key={item.url}
                    className="text-white hover:text-sky-300 transition"
                    href={item.url}
                    rel={item.newTab ? 'noopener noreferrer' : undefined}
                    target={item.newTab ? '_blank' : undefined}
                  >
                    {item.label}
                  </Link>
                ))
              : navItems.map(({ link }, i) => {
                  return <CMSLink className="text-white" key={i} {...link} />
                })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
