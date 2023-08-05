import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@/mock/server'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
