import { useState, useMemo } from 'react'
import { typedFetch } from '@/utils/typedFetch'
import { User, Game } from '@/types/steam'

const { NEXT_PUBLIC_API_PATH } = process.env

type GetSteamUserResponse = {
  statusCode: number
  user: User
  games: Game[]
}

export type UseSteamProps = {
  user: User | undefined
  games: Game[]
  isLoading: boolean
  getUser: (steamid: string) => Promise<void>
}

const sortGames = (games: Game[]): Game[] => {
  return games.sort((gameA: Game, gameB: Game) => {
    return gameB.rtimeLastPlayed - gameA.rtimeLastPlayed
  })
}

export const useSteam = (): UseSteamProps => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getUser = useMemo<UseSteamProps['getUser']>(() => {
    return async (steamid: string): Promise<void> => {
      if (isLoading) {
        return
      }

      setIsLoading(true)
      const body = await typedFetch<GetSteamUserResponse>(
        `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamid}`,
      )
      console.log(body)
      setUser(body.user)
      setGames(sortGames(body.games))
      setIsLoading(false)
    }
  }, [isLoading, setUser, setGames, setIsLoading])

  return {
    user,
    games,
    isLoading,
    getUser,
  }
}
