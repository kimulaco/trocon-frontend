import React, { memo, FC, ReactNode } from 'react'
import Head from 'next/head'
import { ChakraProps } from '@chakra-ui/react'
import { Flex } from '@/components/chakra/'

export type AppLayoutProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppLayout: FC<AppLayoutProps> = memo(function AppLayout({
  children,
  chakra,
}: AppLayoutProps) {
  return (
    <>
      <Head>
        <title>Trocon</title>
        <meta property='description' content='Steamの実績解除状態を調べるサービス。' />
      </Head>

      <Flex flexDirection='column' w='100%' minH='var(--chakra-vh)' pb={8} {...(chakra || {})}>
        {children}

        <Flex as='footer' justifyContent='center' mt='auto' px='3' pt='8'>
          <p>© 2023 Trocon.</p>
        </Flex>
      </Flex>
    </>
  )
})
