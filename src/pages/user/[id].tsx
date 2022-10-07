import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppLayout } from '@/components/layout/AppLayout/'
import { useSteam } from '@/utils/useSteam'

const queryToString = (query: string | string[]): string => {
  if (Array.isArray(query)) {
    return query.join(',')
  }
  return query
}

const UserPage: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, games, getUser } = useSteam(id)

  useEffect(() => {
    if (id) {
      getUser(queryToString(id))
    }
  }, [id])

  return (
    <AppLayout>
      <div>
        <pre>{JSON.stringify(user || {}, null, '  ')}</pre>
      </div>
      <div style={{marginTop: '20px'}}>
        <pre>{JSON.stringify(games, null, '  ')}</pre>
      </div>
    </AppLayout>
  )
}

export default UserPage
