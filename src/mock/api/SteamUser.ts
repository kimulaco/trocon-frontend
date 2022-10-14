import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { complatedGame, zeroGame, halfGame } from '../data/game'

const { NEXT_PUBLIC_API_PATH } = process.env

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      user: createUser({
        steamId: req.params.steamId,
      }),
      games,
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

const games = [complatedGame, zeroGame, halfGame]
