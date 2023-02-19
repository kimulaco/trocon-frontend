import React, { memo, FC, ReactNode } from 'react'
import { Box, Badge, ChakraProps } from '@chakra-ui/react'

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
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      mt='100px'
      mb='50px'
    >
      <Box as='h1' fontSize='80px' fontWeight='bold' lineHeight='1' textAlign='center' {...chakra}>
        {children}
      </Box>

      <Badge colorScheme='orange' mt='4'>
        alpha
      </Badge>
    </Box>
  )
})
