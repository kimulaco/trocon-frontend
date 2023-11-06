import { http, HttpResponse, delay } from 'msw'
import { createUser } from '@/mock/data/steam/user'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/search`

export const handler = http.get<Record<string, never>>(url, async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  if (NODE_ENV === 'test') {
    await delay(2000)
  }

  if (!q) {
    return HttpResponse.json(
      {
        statusCode: 400,
        errorCode: 'STEAM_USER_SEARCH_Q_NOT_FOUND',
        message: 'q not found',
      },
      { status: 400 },
    )
  }

  return HttpResponse.json({
    statusCode: 200,
    users: [
      createUser({ steamId: '76561198000000000', personaName: 'Steam User 1' }),
      createUser({ steamId: '76561198000000001', personaName: 'Steam User 2' }),
    ],
  })
})
