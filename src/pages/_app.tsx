import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from '@chakra-ui/react'
import '@/styles/variables.css'

if (process.env.NODE_ENV === 'development') {
  const MockServer = () => import('@/mock/worker')
  MockServer()
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
