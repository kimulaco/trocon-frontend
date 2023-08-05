import { describe, expect, it } from 'vitest'
import { rest } from 'msw'
import { server } from '@/mock/server'
import { typedFetch } from '.'

type Response = { statusCode: number; success: boolean; message: string }

const API_BASE_URL = 'http://localhost:4000'

const RESPONSE_200: Response = {
  statusCode: 200,
  success: true,
  message: 'OK',
}

const RESPONSE_500: Response = {
  statusCode: 200,
  success: false,
  message: 'Internal Server Error',
}

describe('typedFetch', () => {
  it('slould fetch when status 200', async () => {
    server.use(
      rest.get(`${API_BASE_URL}/api/test/200`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json<Response>(RESPONSE_200))
      }),
    )

    const data = await typedFetch<Response>(`${API_BASE_URL}/api/test/200`)
    expect(data).toEqual(RESPONSE_200)
  })

  it('slould throw error when status 500', async () => {
    server.use(
      rest.get(`${API_BASE_URL}/api/test/500`, (_, res, ctx) => {
        return res(ctx.status(500), ctx.json<Response>(RESPONSE_500))
      }),
    )

    const doFetch = () => {
      return typedFetch<Response>(`${API_BASE_URL}/api/test/500`)
    }
    await expect(doFetch).rejects.toThrowError('Internal Server Error')
  })
})
