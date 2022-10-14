import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { complatedGame, zeroGame, halfGame } from '../data/game'

const { NEXT_PUBLIC_API_PATH } = process.env

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId/trophy`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      trophies,
    }),
  )
}

export const handler = rest.get(url, onRequest)

const trophies = [
  {
    appId: complatedGame.appId,
    gameName: complatedGame.name,
    success: true,
    trophies: [
      ...[...Array(10)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: 1,
          unlocktime: 1656147897,
        }
      }),
    ],
  },
  {
    appId: zeroGame.appId,
    gameName: zeroGame.name,
    success: true,
    trophies: [
      ...[...Array(5)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: 0,
          unlocktime: 0,
        }
      }),
    ],
  },
  {
    appId: halfGame.appId,
    gameName: halfGame.name,
    success: true,
    trophies: [
      ...[...Array(20)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: index <= 10,
          unlocktime: index <= 10 ? 1656147897 : 0,
        }
      }),
    ],
  },
]
