import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { extendTheme } from '@chakra-ui/react'
import { useMock } from '@/utils/useMock'
import '@/styles/variables.css'

const theme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1000px',
  }
})

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
