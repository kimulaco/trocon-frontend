import React, { FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type AppLayoutProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppLayout: FC<AppLayoutProps> = ({ children, chakra }) => {
  return <Box
    pb={8}
    {...chakra || {}}
  >{children}</Box>
}
