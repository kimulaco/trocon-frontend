import { useState, useCallback } from 'react'
import { logger } from '@/utils/logger'

export const useMock = () => {
  const [isReadyMock, setIsReadyMock] = useState<boolean>(false)

  const setupMock = useCallback(async () => {
    /* c8 ignore start */
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK) {
      logger.log('import worker')
      const { startWorker } = await import('@/mock/worker')
      await startWorker()
      logger.log('ready worker')
    }
    /* c8 ignore end */
    setIsReadyMock(true)
  }, [setIsReadyMock])

  return {
    isReadyMock,
    setupMock,
  }
}
