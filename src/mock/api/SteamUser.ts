import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { complatedGame, zeroGame, halfGame, noGame, failedGame } from '../data/game'
import { Game } from '../../types/steam'

const { NEXT_PUBLIC_API_PATH } = process.env
const GAME_LENGTH = 20

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      user: createUser({ steamId: req.params.steamId }),
      games: createGames(),
    }),
  )
}

export const handler = rest.get(url, onRequest)

const createUser = (user = {}) => {
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

const createGames = (): Game[] => {
  const _games: Game[] = [...Array(GAME_LENGTH)].map((_, index: number): Game => {
    const game = games[index % games.length]
    return {
      ...game,
      appId: index,
    }
  })
  return _games
}

const games: Readonly<Game[]> = [complatedGame, zeroGame, halfGame, noGame, failedGame]
