import { useState } from 'react'
import { typedFetch } from '@/utils/typedFetch'
import { User, Game } from '@/types/steam'

const { NEXT_PUBLIC_API_PATH } = process.env

type GetSteamUserResponse = {
  statusCode: number
  user: User
  games: Game[]
}

export const useSteam = (steamid) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [games, setGames] = useState<Game[]>([])

  const getUser = async () => {
    const body = await typedFetch<GetSteamUserResponse>(
      `${NEXT_PUBLIC_API_PATH}/api/steam/user/${steamid}`,
    )
    setUser(body.user)
    setGames(body.games)
  }

  return {
    user,
    games,
    getUser,
  }
}
