import React, { FC, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Text, Grid, GridItem } from '@/components/chakra/'
import { AppLayout } from '@/components/layout/AppLayout/'
import { AppHeader } from '@/components/layout/AppHeader/'
import { AppInner } from '@/components/layout/AppInner/'
import { ErrorText } from '@/components/atoms/ErrorText/'
import { BaseButton } from '@/components/atoms/BaseButton/'
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
  return games
    .filter((game: Game) => {
      return !!game?.isLoadingTrophies
    })
    .map((game: Game) => {
      return game.appId
    })
}

const getIsVisibleTrophyProgress = (game: Game): boolean => {
  if (game.isLoadingTrophies) {
    return true
  }
  return !game.isFailedGetTrophies && (game.trophies || []).length > 0
}

const UserPage: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, getUser, getGameTrophy } = useSteam()
  const { GameDetailModal, showModal: showGameDetailModal } = useGameDetailModal()

  const handleClickGameDetail = useCallback(
    (game: Game) => {
      showGameDetailModal(game)
    },
    [showGameDetailModal],
  )

  const handleIntersectObserver = useCallback(
    (_: IntersectionObserverEntry, i: number) => {
      if (!id) return
      const appIds = getUnLoadedAppIds([...user.games].slice(i, i + GAME_PER_PAGE))
      if (appIds.length > 0) {
        getGameTrophy(queryToString(id), appIds)
      }
    },
    [id, user.games],
  )

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
      <AppHeader />

      <AppInner type='full'>
        <UserProfile user={user.info} isLoading={user.isLoading} />
      </AppInner>

      <AppInner>
        <Grid
          templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          gridAutoColumns='1fr'
          gridAutoFlow='row'
          gap={{ sm: 8, md: 6 }}
        >
          {user.isLoading &&
            [...Array(18)].map((_, i: number) => (
              <GridItem key={`GameViewSkeleton-${i}`}>
                <GameView
                  isLoading={true}
                  body={
                    <>
                      <GameTrophyProgress isLoading={true} />
                      <Flex mt={3}>
                        <BaseButton isLoading={true} isHidden={true} chakra={{ ml: 'auto' }}>
                          Show detail
                        </BaseButton>
                      </Flex>
                    </>
                  }
                />
              </GridItem>
            ))}

          {!user.isLoading &&
            user.games.map((game: Game, i: number) => (
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
                  body={
                    <>
                      <GameTrophyProgress
                        trophies={game.trophies || []}
                        isLoading={!!game.isLoadingTrophies}
                        chakra={{
                          mt: 2,
                          visibility: getIsVisibleTrophyProgress(game) ? 'visible' : 'hidden',
                        }}
                      />
                      <Flex mt={3}>
                        {getIsVisibleTrophyProgress(game) && (
                          <BaseButton
                            isLoading={!!game.isLoadingTrophies}
                            isHidden={!!game.isLoadingTrophies}
                            chakra={{ ml: 'auto' }}
                            onClick={() => {
                              handleClickGameDetail(game)
                            }}
                          >
                            Show detail
                          </BaseButton>
                        )}
                        {!getIsVisibleTrophyProgress(game) && game.isFailedGetTrophies && (
                          <ErrorText>Failed to get trophies.</ErrorText>
                        )}
                        {!getIsVisibleTrophyProgress(game) && !game.isFailedGetTrophies && (
                          <Text color='gray.500'>This game has no trophies.</Text>
                        )}
                      </Flex>
                    </>
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
