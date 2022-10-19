import { useState, useCallback } from 'react'

export const useMock = () => {
  const [isReadyMock, setIsReadyMock] = useState<boolean>(false)

  const setupMock = useCallback(async () => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK) {
      const { startWorker } = await import('@/mock/worker')
      await startWorker()
    }
    setIsReadyMock(true)
  }, [setIsReadyMock])

  return {
    isReadyMock,
    setupMock,
  }
}
