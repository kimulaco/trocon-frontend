import { useState, useMemo } from 'react'
import { typedFetch } from '@/utils/typedFetch'
import { logger } from '@/utils/logger'
import { User, Game, GameTrophy, Trophy } from '@/types/steam'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH

type GetSteamUserResponse = {
  statusCode: number
  user: User
  games: Game[]
}

type GetSteamGameTrophyResponse = {
  statusCode: number
  trophies: GameTrophy[]
}

type UserState = {
  info?: User
  games: Game[]
  isLoading: boolean
  error?: {
    title: string
    message: string
  }
}

type UseSteamValues = {
  user: UserState
  getUser: (steamId: string) => Promise<void>
  getGameTrophy: (steamId: string, appIds: number[]) => Promise<void>
}

const ERROR_MESSAGES = {
  STEAM_USER_NOT_FOUND: 'Steamアカウントが見つかりませんでした。',
  STEAM_USER_INTERNAL_ERROR: 'エラーが発生しました。',
} as const

const getErrorMessage = (errorCode: unknown): string => {
  if (typeof errorCode !== 'string') {
    return ERROR_MESSAGES.STEAM_USER_INTERNAL_ERROR
  }

  if (errorCode in ERROR_MESSAGES) {
    // @ts-ignore
    return ERROR_MESSAGES[errorCode]
  }

  return ERROR_MESSAGES.STEAM_USER_INTERNAL_ERROR
}

const sortGames = (games: Game[]): Game[] => {
  return games.sort((gameA: Game, gameB: Game) => {
    return gameB.rtimeLastPlayed - gameA.rtimeLastPlayed
  })
}

const sortTrophies = (trophies: Trophy[]): Trophy[] => {
  return trophies.sort((trophyA: Trophy, trophyB: Trophy) => {
    if (trophyA.achieved === trophyB.achieved) {
      return 0
    }
    return trophyA.achieved ? 1 : -1
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

const filterUnLoadedAppId = (appIds: number[], games: Game[]): number[] => {
  return appIds.filter((appId: number) => {
    const game = games.find((_game: Game) => _game.appId === appId)
    return !!game?.isLoadingTrophies
  })
}

export const useSteam = (): UseSteamValues => {
  const [user, setUser] = useState<UserState>({
    info: undefined,
    games: [],
    isLoading: false,
    error: undefined,
  })

  const getUser = useMemo<UseSteamValues['getUser']>(() => {
    return async (steamId: string): Promise<void> => {
      if (user.isLoading) {
        return
      }

      let body: GetSteamUserResponse | undefined
      let errorState: { title: string; message: string } | undefined

      setUser({ ...user, isLoading: true })

      try {
        body = await typedFetch<GetSteamUserResponse>(
          `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamId}`,
        )
        logger.log(body)
      } catch (error) {
        errorState = {
          title: 'Error',
          message: getErrorMessage((error as any)?.errorCode),
        }
        logger.error(error)
      }

      setUser({
        info: body?.user,
        isLoading: false,
        games: sortGames(body?.games || []).map((game: Game) => {
          return { ...game, isLoadingTrophies: true }
        }),
        error: errorState,
      })
    }
  }, [user.isLoading, setUser])

  const getGameTrophy = useMemo<UseSteamValues['getGameTrophy']>(() => {
    return async (steamId: string, appIds: number[]): Promise<void> => {
      const _appIds = filterUnLoadedAppId(appIds, user.games)

      if (user.isLoading || _appIds.length <= 0) {
        return
      }

      const body = await typedFetch<GetSteamGameTrophyResponse>(
        `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamId}/trophy?appid=${_appIds.join(',')}`,
      )
      logger.log(body)
      const trophies = body.trophies

      if (trophies.length <= 0) {
        return
      }

      let isSet = false
      const _games = user.games.map((_game: Readonly<Game>): Game => {
        if (typeof _game?.isLoadingTrophies === 'boolean' && !_game.isLoadingTrophies) {
          return _game
        }
        const trophy = findGameTrophies(_game.appId, trophies)
        if (!trophy) {
          return _game
        }
        isSet = true
        return {
          ..._game,
          isLoadingTrophies: false,
          isFailedGetTrophies: !trophy.success,
          trophies: sortTrophies(trophy.trophies),
        }
      })

      if (isSet) {
        setUser({ ...user, games: _games })
      }
    }
  }, [user, setUser])

  return {
    user,
    getUser,
    getGameTrophy,
  }
}
