import React, { useCallback, FC } from 'react'
import { useRouter } from 'next/router'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'
import { TopTitle } from '@/components/molecules/TopTitle/'
import { UserSearchForm } from '@/components/molecules/UserSearchForm/'

const IndexPage: FC = () => {
  const router = useRouter()

  const handleSubmitForm = useCallback((value: string) => {
    router.push(`/user/${value}`)
  }, [])

  return (
    <AppLayout>
      <AppInner>
        <TopTitle>Trocon</TopTitle>

        <UserSearchForm onSubmit={handleSubmitForm} />
      </AppInner>
    </AppLayout>
  )
}

export default IndexPage
