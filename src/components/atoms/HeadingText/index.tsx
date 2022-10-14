import React, { memo, FC, ReactNode } from 'react'
import { Heading, ChakraProps } from '@chakra-ui/react'

export type HeadingTextProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const HeadingText: FC<HeadingTextProps> = memo(function UserIcon({
  children,
  chakra = {},
}: HeadingTextProps) {
  return (
    <Heading
      mt={4}
      mb={4}
      fontSize='2xl'
      {...chakra}
    >
      {children}
    </Heading>
  )
})
