import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from '@chakra-ui/react'
import { useMock } from '@/utils/useMock'
import '@/styles/variables.css'

const App = ({ Component, pageProps }: AppProps) => {
  const { isReadyMock, setupMock } = useMock()

  useEffect(() => {
    setupMock()
  }, [setupMock])

  return (
    <ChakraProvider theme={theme}>
      {isReadyMock && <Component {...pageProps} />}
    </ChakraProvider>
  )
}

export default App
