import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Grid, GridItem } from '@/components/chakra/'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'
import { UserProfile } from '@/components/molecules/UserProfile/'
import { GameView } from '@/components/molecules/GameView/'
import { GameTrophyProgress } from '@/components/molecules/GameTrophyProgress/'
import { useSteam } from '@/utils/useSteam'
import { logger } from '@/utils/logger'
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

  useEffect(() => {
    if (!id) {
      return
    }
    try {
      getUser(queryToString(id))
    } catch (error) {
      logger.error(error)
    }
  }, [id])

  useEffect(() => {
    if (!id || games.length <= 0) {
      return
    }
    try {
      getGameTrophy(queryToString(id), [
        games[0].appId,
      ])
    } catch (error) {
      logger.error(error)
    }
  }, [games])

  return (
    <AppLayout>
      <AppInner type='full'>
        <UserProfile user={user} isLoading={isLoading} />
      </AppInner>

      <AppInner>
        <Heading mt={4} mb={4} fontSize='2xl'>
          <Box as='span'>Games</Box>
          <Box as='span'>{isLoading ? '' : ` (${games.length})`}</Box>
        </Heading>

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
