import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { createDummyTropy } from '@/mock/data/steam/trophy'
import { GameTrophy } from '@/types/steam'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId/trophy`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  const appidQuery = req.url.searchParams.get('appid')
  const appids = (appidQuery || '').split(',')
  return res(
    ctx.delay(NODE_ENV === 'test' ? 0 : 2000),
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      trophies: appids
        .map((appid: string): GameTrophy | undefined => {
          return createDummyTropy(Number(appid))
        })
        .filter((trophy: GameTrophy | undefined) => !!trophy),
    }),
  )
}

export const handler = rest.get(url, onRequest)
