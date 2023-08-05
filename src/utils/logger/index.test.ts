import { describe, beforeEach, expect, it, vi } from 'vitest'
import { logger } from '.'

describe('logger', () => {
  const spyConsoleLog = vi.spyOn(global.console, 'log')
  const spyConsoleError = vi.spyOn(global.console, 'error')

  beforeEach(() => {
    spyConsoleLog.mockClear()
    spyConsoleError.mockClear()
  })

  it("shouldn't run console if NODE_ENV isn't development", () => {
    logger.log('log message')
    logger.error('error message')
    expect(spyConsoleLog).not.toBeCalled()
    expect(spyConsoleError).not.toBeCalled()
  })

  // TODO: fix this test
  it.skip('should run console if NODE_ENV is development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    expect(process.env.NODE_ENV).toBe('development')

    logger.log('log message')
    logger.error('error message')
    expect(spyConsoleLog.mock.calls).toEqual([['log message']])
    expect(spyConsoleError.mock.calls).toEqual([['log message']])
  })
})
