import React, { FC, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Grid, GridItem } from '@/components/chakra/'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppInner } from '@/components/layout/AppInner/'
import { IntersectionObserverContainer } from '@/components/atoms/IntersectionObserverContainer/'
import { UserProfile } from '@/components/molecules/UserProfile/'
import { GameView } from '@/components/molecules/GameView/'
import { GameTrophyProgress } from '@/components/molecules/GameTrophyProgress/'
import { queryToString } from '@/utils/queryToString'
import { useSteam } from '@/utils/useSteam'
import { useGameDetailModal } from '@/utils/useGameDetailModal'
import { logger } from '@/utils/logger'
import { Game } from '@/types/steam'

const GAME_PER_PAGE = 12

const getUnLoadedAppIds = (games: Game[]): number[] => {
  const unLoadedGames = games.filter((game: Game) => {
    return !!game?.isLoadingTrophies
  })
  // console.log('unLoadedGames:', unLoadedGames)
  return unLoadedGames.map((game: Game) => {
    return game.appId
  })
}

const UserPage: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, getUser, getGameTrophy } = useSteam()
  const { GameDetailModal, showModal: showGameDetailModal } = useGameDetailModal()

  const handleClickGameDetail = useCallback((game: Game) => {
    showGameDetailModal(game)
  }, [showGameDetailModal])

  const handleIntersectObserver = useCallback((_: IntersectionObserverEntry, i: number) => {
    if (!id) return
    const appIds = getUnLoadedAppIds([...user.games].slice(i, i + GAME_PER_PAGE))
    if (appIds.length > 0) {
      getGameTrophy(queryToString(id), appIds)
    }
  }, [id, user.games])

  useEffect(() => {
    if (!id) return
    try {
      getUser(queryToString(id))
    } catch (error) {
      logger.error(error)
    }
  }, [id])

  return (
    <AppLayout>
      <AppInner type='full'>
        <UserProfile user={user.info} isLoading={user.isLoading} />
      </AppInner>

      <AppInner>
        <Heading mt={4} mb={4} fontSize='xl'>
          <Box as='span'>Games</Box>
          <Box as='span'>{user.isLoading ? '' : ` (${user.games.length})`}</Box>
        </Heading>

        <Grid
          templateColumns='repeat(1, 1fr)'
          gridAutoColumns='1fr'
          gridAutoFlow='row'
          gap={8}
        >
          {user.isLoading && [...Array(18)].map((_, i: number) => (
            <GridItem key={`GameViewSkeleton-${i}`}>
              <GameView
                isLoading={true}
                progress={
                  <GameTrophyProgress isLoading={true} />
                }
              />
            </GridItem>
          ))}

          {!user.isLoading && user.games.map((game: Game, i: number) => (
            <GridItem key={`GameView-${i}`}>
              {i % GAME_PER_PAGE === 0 && (
                <IntersectionObserverContainer
                  onIntersecting={(entry: IntersectionObserverEntry) => {
                    handleIntersectObserver(entry, i)
                  }}
                  chakra={{ w: '100%', h: '1px', mb: '-1px', opacity: 0 }}
                />
              )}

              <GameView
                rootTagName='section'
                game={game}
                isLoading={user.isLoading}
                progress={
                  <GameTrophyProgress
                    trophies={game.trophies || []}
                    isLoading={!!game.isLoadingTrophies}
                    chakra={{ mt: 2 }}
                    onClickButton={() => {handleClickGameDetail(game)}}
                  />
                }
              />
            </GridItem>
          ))}
        </Grid>
      </AppInner>

      <GameDetailModal />
    </AppLayout>
  )
}

export default UserPage
