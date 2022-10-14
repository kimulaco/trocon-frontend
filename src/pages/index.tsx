import React, { FC } from 'react'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'

const IndexPage: FC = () => {
  return (
    <AppLayout>
      <AppInner>
        <h1>Hello Next.js</h1>
      </AppInner>
    </AppLayout>
  )
}

export default IndexPage
