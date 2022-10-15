import React, { memo, FC, ReactNode } from 'react'
import { ChakraProps } from '@chakra-ui/react'
import { Box } from '@/components/chakra/'

export type AppInnerProps = {
  type?: 'center' | 'full'
  children?: ReactNode
  chakra?: ChakraProps
}

export const AppInner: FC<AppInnerProps> = memo(function AppInner({
  type = 'center',
  children,
  chakra,
}: AppInnerProps) {
  return (
    <Box
      maxW='var(--app-inner-max-width)'
      minW={type === 'center' ? 'var(--app-inner-min-width)' : ''}
      m='auto'
      px={type === 'center' ? 3 : 0}
      {...chakra || {}}
    >
      {children}
    </Box>
  )
})
