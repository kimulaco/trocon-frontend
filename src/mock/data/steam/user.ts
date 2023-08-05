import { games } from './game'
import { Game } from '@/types/steam'

const GAME_LENGTH = 20

export const createUser = (user = {}) => {
  return Object.assign(
    {
      steamId: '',
      communityVisibilityState: 3,
      profileState: 1,
      personaName: 'Steam User Name',
      lastLogoff: 1665742035,
      profileUrl: 'https://steamcommunity.com',
      avatar: '',
      avatarMedium: '',
      avatarFull: '/mock/user-avatar.png',
    },
    user || {},
  )
}

export const createGames = (): Game[] => {
  const _games: Game[] = [...Array(GAME_LENGTH)].map((_, index: number): Game => {
    const game = games[index % games.length]
    return {
      ...game,
      appId: index,
    }
  })
  return _games
}
