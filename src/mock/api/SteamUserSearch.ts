import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { createUser } from '@/mock/data/steam/user'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/search`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  const q = req.url.searchParams.get('q')

  if (!q) {
    return res(
      ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
      ctx.status(400),
      ctx.json({
        statusCode: 400,
        errorCode: 'STEAM_USER_SEARCH_Q_NOT_FOUND',
        message: 'q not found',
      }),
    )
  }

  return res(
    ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      users: [
        createUser({ steamId: '76561198000000000', personaName: 'Steam User 1' }),
        createUser({ steamId: '76561198000000001', personaName: 'Steam User 2' }),
      ],
    }),
  )
}

export const handler = rest.get(url, onRequest)
