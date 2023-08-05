import { describe, beforeEach, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMock } from '.'

describe('useMock', () => {
  const spyConsoleLog = vi.spyOn(global.console, 'log')

  beforeEach(() => {
    spyConsoleLog.mockClear()
  })

  it('should not run mock if NODE_ENV is not development', async () => {
    const { result } = renderHook(() => useMock())

    expect(result.current.isReadyMock).toBe(false)
    expect(process.env.NODE_ENV).toBe('test')

    await act(async () => {
      await result.current.setupMock()
    })

    expect(result.current.isReadyMock).toBe(true)
    expect(spyConsoleLog).not.toBeCalled()
  })
})
