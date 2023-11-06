import { http, HttpResponse, delay } from 'msw'
import { createUser, createGames } from '@/mock/data/steam/user'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId`

export const handler = http.get<{ steamId: string }>(url, async ({ params }) => {
  if (NODE_ENV === 'test') {
    await delay(2000)
  }

  if (!params.steamId) {
    return HttpResponse.json(
      {
        statusCode: 400,
        errorCode: 'STEAM_USER_STEAMID_NOT_FOUND',
        message: 'steamid not found',
      },
      { status: 400 },
    )
  }

  if (Number(params.steamId) === 500) {
    return HttpResponse.json(
      {
        statusCode: 500,
        errorCode: 'STEAM_USER_INTERNAL_ERROR',
        message: 'internal server error',
      },
      { status: 500 },
    )
  }

  if (params.steamId.length !== 17 || isNaN(Number(params.steamId))) {
    return HttpResponse.json(
      {
        statusCode: 404,
        errorCode: 'STEAM_USER_NOT_FOUND',
        message: 'user not found',
      },
      { status: 404 },
    )
  }

  return HttpResponse.json({
    statusCode: 200,
    user: createUser({ steamId: params.steamId }),
    games: createGames(),
  })
})
