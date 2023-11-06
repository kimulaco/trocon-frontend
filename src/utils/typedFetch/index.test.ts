import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
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
  statusCode: 500,
  success: false,
  message: 'Internal Server Error',
}

describe('typedFetch', () => {
  it('slould fetch when status 200', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/test/200`, () => {
        return HttpResponse.json(RESPONSE_200)
      }),
    )

    const data = await typedFetch<Response>(`${API_BASE_URL}/api/test/200`)
    expect(data).toEqual(RESPONSE_200)
  })

  it('slould throw error when status 500', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/test/500`, () => {
        return HttpResponse.json(RESPONSE_500, {
          status: RESPONSE_500.statusCode,
        })
      }),
    )

    const doFetch = () => {
      return typedFetch<Response>(`${API_BASE_URL}/api/test/500`)
    }
    await expect(doFetch).rejects.toThrowError('Internal Server Error')
  })
})
