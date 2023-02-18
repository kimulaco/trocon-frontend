import React, { useCallback, FC, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppHeader } from '@/components/layout/AppHeader/'
import { AppInner } from '@/components/layout/AppInner/'
import { ErrorTitle } from '@/components/molecules/ErrorTitle'

const NotfoundPage: FC = () => {
  const router = useRouter()

  const handleClickTop = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push('/')
  }, [])

  return (
    <AppLayout>
      <AppHeader />

      <AppInner>
        <ErrorTitle title='404' message='ページが見つかりませんでした。'>
          <Button as='a' href='/' onClick={handleClickTop}>
            Top page
          </Button>
        </ErrorTitle>
      </AppInner>
    </AppLayout>
  )
}

export default NotfoundPage
