import React, { memo, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type AppInnerProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppInner: FC<AppInnerProps> = memo(function AppInner({
  children,
  chakra,
}: AppInnerProps) {
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
})
