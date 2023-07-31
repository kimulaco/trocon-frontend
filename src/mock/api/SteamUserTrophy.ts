import { rest, ResponseResolver, RestRequest, PathParams, RestContext, DefaultBodyType } from 'msw'
import { complatedGame, zeroGame, halfGame, noGame, failedGame } from '../data/game'
import { GameTrophy } from '@/types/steam'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId/trophy`

const onRequest: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  const appidQuery = req.url.searchParams.get('appid')
  const appids = (appidQuery || '').split(',')
  return res(
    ctx.delay(1000),
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

const createDummyTropy = (appid: number): GameTrophy => {
  const baseTrophy: GameTrophy = trophies[appid % trophies.length] || trophies[0]
  return {
    ...baseTrophy,
    appId: appid,
  }
}

const trophies: Readonly<GameTrophy[]> = [
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
          achieved: index <= 10 ? 1 : 0,
          unlocktime: index <= 10 ? 1656147897 : 0,
        }
      }),
    ],
  },
  {
    appId: noGame.appId,
    gameName: noGame.name,
    success: true,
    trophies: [],
  },
  {
    appId: failedGame.appId,
    gameName: '',
    success: false,
    trophies: [],
  },
]
