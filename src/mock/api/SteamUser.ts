import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { createUser, createGames } from '../data/steam'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  if (!req.params.steamId) {
    return res(
      ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
      ctx.status(400),
      ctx.json({
        statusCode: 400,
        errorCode: 'STEAM_USER_STEAMID_NOT_FOUND',
        message: 'steamid not found',
      }),
    )
  }

  if (Number(req.params.steamId) === 500) {
    return res(
      ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
      ctx.status(500),
      ctx.json({
        statusCode: 500,
        errorCode: 'STEAM_USER_INTERNAL_ERROR',
        message: 'internal server error',
      }),
    )
  }

  if (req.params.steamId.length !== 17 || isNaN(Number(req.params.steamId))) {
    return res(
      ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
      ctx.status(404),
      ctx.json({
        statusCode: 404,
        errorCode: 'STEAM_USER_NOT_FOUND',
        message: 'user not found',
      }),
    )
  }

  return res(
    ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      user: createUser({ steamId: req.params.steamId }),
      games: createGames(),
    }),
  )
}

export const handler = rest.get(url, onRequest)
