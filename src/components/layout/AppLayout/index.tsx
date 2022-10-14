import React, { memo, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type AppLayoutProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppLayout: FC<AppLayoutProps> = memo(function AppLayout({
  children,
  chakra,
}: AppLayoutProps) {
  return <Box
    pb={8}
    {...chakra || {}}
  >{children}</Box>
})
