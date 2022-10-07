import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
