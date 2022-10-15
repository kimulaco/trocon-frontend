import { useState, useMemo } from 'react'
import { typedFetch } from '@/utils/typedFetch'
import { logger } from '@/utils/logger'
import { User, Game, GameTrophy } from '@/types/steam'

const { NEXT_PUBLIC_API_PATH } = process.env

type GetSteamUserResponse = {
  statusCode: number
  user: User
  games: Game[]
}

type GetSteamGameTrophyResponse = {
  statusCode: number
  trophies: GameTrophy[]
}

export type UseSteamProps = {
  user: User | undefined
  games: Game[]
  isLoading: boolean
  getUser: (steamId: string) => Promise<void>
  getGameTrophy: (steamId: string, appIds: number[]) => Promise<void>
}

const sortGames = (games: Game[]): Game[] => {
  return games.sort((gameA: Game, gameB: Game) => {
    return gameB.rtimeLastPlayed - gameA.rtimeLastPlayed
  })
}

const findGameTrophies = (
  appId: number,
  trophies: Readonly<GameTrophy[]>,
): GameTrophy | undefined => {
  return trophies.find((trophy: GameTrophy) => {
    return trophy.appId === appId
  })
}

export const useSteam = (): UseSteamProps => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getUser = useMemo<UseSteamProps['getUser']>(() => {
    return async (steamId: string): Promise<void> => {
      if (isLoading) {
        return
      }

      setIsLoading(true)
      const body = await typedFetch<GetSteamUserResponse>(
        `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamId}`,
      )
      logger.log(body)
      setUser(body.user)
      setGames(
        sortGames(body.games).map((game: Game) => {
          return { ...game, isLoadedTrophies: true }
        }),
      )
      setIsLoading(false)
    }
  }, [isLoading, setUser, setGames, setIsLoading])

  const getGameTrophy = useMemo<UseSteamProps['getGameTrophy']>(() => {
    return async (steamId: string, appIds: number[]): Promise<void> => {
      if (isLoading || appIds.length <= 0) {
        return
      }

      const body = await typedFetch<GetSteamGameTrophyResponse>(
        `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamId}/trophy?appid=${appIds.join(',')}`,
      )
      logger.log(body)
      const trophies = body.trophies

      if (trophies.length <= 0) {
        return
      }

      let isSet = false
      const _games = games.map((_game: Readonly<Game>): Game => {
        if (typeof _game?.isLoadedTrophies === 'boolean' && !_game.isLoadedTrophies) {
          return _game
        }
        const trophy = findGameTrophies(_game.appId, trophies)
        if (!trophy) {
          return _game
        }
        isSet = true
        return {
          ..._game,
          isLoadedTrophies: false,
          trophies: trophy.trophies,
        }
      })

      if (isSet) {
        setGames(_games)
      }
    }
  }, [games, setGames])

  return {
    user,
    games,
    isLoading,
    getUser,
    getGameTrophy,
  }
}
