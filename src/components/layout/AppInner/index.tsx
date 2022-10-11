import React, { FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type AppInnerProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppInner: FC<AppInnerProps> = ({ children, chakra }) => {
  return (
    <Box
      maxW='var(--app-inner-max-width)'
      minW='var(--app-inner-min-width)'
      m='auto'
      px={3}
      {...chakra || {}}
    >
      {children}
    </Box>
  )
}
