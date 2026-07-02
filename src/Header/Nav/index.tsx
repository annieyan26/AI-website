'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { DEFAULT_NAV } from '@/constants/lab'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const cmsNavItems = data?.navItems || []
  const useDefaultNav = cmsNavItems.length === 0 || isPayloadTemplateNav(cmsNavItems)

  return (
    <nav className="flex gap-3 items-center">
      {useDefaultNav
        ? DEFAULT_NAV.map((item) => (
            <Link
              key={item.url}
              className="text-sm font-medium transition hover:text-primary"
              href={item.url}
            >
              {item.label}
            </Link>
          ))
        : cmsNavItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

function isPayloadTemplateNav(navItems: HeaderType['navItems']) {
  const labels = navItems?.map(({ link }) => link.label?.toLowerCase()) || []
  return labels.includes('posts') && labels.includes('admin')
}
