import React, { memo, FC } from 'react'
import Link from 'next/link'
import { Badge, ChakraProps } from '@chakra-ui/react'
import { Box, Flex } from '@/components/chakra/'

export type AppHeaderProps = {
  chakra?: ChakraProps
}

export const AppHeader: FC<AppHeaderProps> = memo(function AppHeader({ chakra }: AppHeaderProps) {
  return (
    <Box as='header' w='100%' boxShadow='0 0 5px rgba(0, 0, 0, 0.2)' {...(chakra || {})}>
      <Box
        w='100%'
        maxW='var(--app-inner-max-width)'
        minW='var(--app-inner-min-width)'
        m='auto'
        px='3'
      >
        <Box as='h1' py='3' fontSize='2xl' fontWeight='bold'>
          <Flex py='1' alignItems='flex-end'>
            <Link href='/'>
              <Box as='span' lineHeight='1'>
                Trocon
              </Box>
            </Link>
            <Badge colorScheme='orange' ml='2'>
              alpha
            </Badge>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
})
