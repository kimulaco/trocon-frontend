import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading, Grid, GridItem } from '@chakra-ui/react'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'
import { UserProfile } from '@/components/molecules/UserProfile/'
import { GameView } from '@/components/molecules/GameView/'
import { GameTrophyProgress } from '@/components/molecules/GameTrophyProgress/'
import { useSteam } from '@/utils/useSteam'
import { Game } from '@/types/steam'

const queryToString = (query: string | string[]): string => {
  if (Array.isArray(query)) {
    return query.join(',')
  }
  return query
}

const UserPage: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, games, isLoading, getUser, getGameTrophy } = useSteam()

  const getSteamUser = async (id: string) => {
    if (!id) {
      return
    }

    try {
      await getUser(id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      getSteamUser(queryToString(id))
    }
  }, [id])

  useEffect(() => {
    if (id && games.length > 0) {
      getGameTrophy(queryToString(id), games[0].appId)
    }
  }, [id, games])

  return (
    <AppLayout>
      <AppInner>
        <UserProfile user={user} isLoading={isLoading} />
      </AppInner>

      <AppInner>
        <Heading
          mt={4}
          mb={4}
          fontSize='2xl'
        >{`${user?.personaName ? `${user?.personaName}'s` : ''} games`}</Heading>

        <Grid
          templateColumns='repeat(1, 1fr)'
          gridAutoColumns='1fr'
          gridAutoFlow='row'
          gap={8}
        >
          {isLoading && [...Array(18)].map((_, i: number) => {
            return (
              <GridItem key={`GameViewSkeleton-${i}`}>
                <GameView
                  isLoading={true}
                  progress={
                    <GameTrophyProgress isLoading={true} />
                  }
                />
              </GridItem>
            )
          })}

          {!isLoading && games.map((game: Game, i: number) => {
            return (
              <GridItem key={`GameView-${i}`}>
                <GameView
                  rootTagName='section'
                  game={game}
                  isLoading={isLoading}
                  progress={
                    <GameTrophyProgress
                      trophies={game.trophies || []}
                      isLoading={!!game.isLoadedTrophies}
                      chakra={{ mt: 2 }}
                    />
                  }
                />
              </GridItem>
            )
          })}
        </Grid>
      </AppInner>
    </AppLayout>
  )
}

export default UserPage
