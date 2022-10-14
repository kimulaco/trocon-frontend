import { useState, useMemo } from 'react'
import { typedFetch } from '@/utils/typedFetch'
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
  getGameTrophy: (steamId: string, appId: number) => Promise<void>
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
      console.log(body)
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
    return async (steamId: string, appId: number): Promise<void> => {
      if (isLoading) {
        return
      }

      const body = await typedFetch<GetSteamGameTrophyResponse>(
        `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamId}/trophy?appid=${appId}`,
      )
      const trophies = findGameTrophies(appId, body.trophies)

      if (!trophies) {
        return
      }

      let isSet = false
      const _games = games.map((_game: Readonly<Game>): Game => {
        if (
          appId !== _game.appId ||
          (typeof _game?.isLoadedTrophies === 'boolean' && !_game.isLoadedTrophies)
        ) {
          return _game
        }
        isSet = true
        return {
          ..._game,
          isLoadedTrophies: false,
          trophies: trophies.trophies,
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
