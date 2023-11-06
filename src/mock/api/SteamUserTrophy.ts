import { http, HttpResponse, delay } from 'msw'
import { createDummyTropy } from '@/mock/data/steam/trophy'
import { GameTrophy } from '@/types/steam'

const NEXT_PUBLIC_API_PATH = process.env.NEXT_PUBLIC_API_PATH
const NODE_ENV = process.env.NODE_ENV

const url = `${NEXT_PUBLIC_API_PATH}/api/steam/user/:steamId/trophy`

export const handler = http.get<Record<string, never>>(url, async ({ request }) => {
  const url = new URL(request.url)
  const appidQuery = url.searchParams.get('appid')
  const appids = (appidQuery || '').split(',')

  if (NODE_ENV === 'test') {
    await delay(2000)
  }

  return HttpResponse.json({
    statusCode: 200,
    trophies: appids.map((appid: string): GameTrophy | undefined => {
      return createDummyTropy(Number(appid))
    }),
  })
})
