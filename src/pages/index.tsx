import React, { FC } from 'react'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'
import { GameTrophyProgress } from '@/components/molecules/GameTrophyProgress/'

const IndexPage: FC = () => {
  return (
    <AppLayout>
      <AppInner>
        <h1>Hello Next.js</h1>

        <GameTrophyProgress
          trophy={{
            success: true,
            gameName: 'Cyberpunk 2077',
            trophies: [
              {
                'apiname': 'TheFool',
                'name': '愚者',
                'description': '',
                'achieved': 1,
                'unlocktime': 1607788704
              },
              {
                'apiname': 'TheLovers',
                'name': '恋人',
                'description': '',
                'achieved': 0,
                'unlocktime': 1608055137
              },
              {
                'apiname': 'TheHermit',
                'name': '隠者',
                'description': '',
                'achieved': 1,
                'unlocktime': 1608400307
              },
            ],
          }}
        />
      </AppInner>
    </AppLayout>
  )
}

export default IndexPage
