import React, { memo, FC, ReactNode } from 'react'
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
    <Flex flexDirection='column' w='100%' minH='var(--chakra-vh)' pb={8} {...(chakra || {})}>
      {children}

      <Flex as='footer' justifyContent='center' mt='auto' px='3'>
        <p>© 2020 Trocon.</p>
      </Flex>
    </Flex>
  )
})
