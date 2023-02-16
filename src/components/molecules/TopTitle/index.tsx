import React, { memo, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type TopTitleProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const TopTitle: FC<TopTitleProps> = memo(function UserIcon({
  children,
  chakra = {},
}: TopTitleProps) {
  return (
    <Box
      as='h1'
      mt='100px'
      mb='50px'
      fontSize='80px'
      fontWeight='bold'
      lineHeight='1'
      textAlign='center'
      {...chakra}
    >
      {children}
    </Box>
  )
})
