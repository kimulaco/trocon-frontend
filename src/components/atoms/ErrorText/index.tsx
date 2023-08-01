import React, { memo, FC, ReactNode } from 'react'
import { Text, ChakraProps } from '@chakra-ui/react'

export type ErrorTextProps = {
  children?: ReactNode
  chakra?: ChakraProps
}

export const ErrorText: FC<ErrorTextProps> = memo(function UserIcon({
  children,
  chakra = {},
}: ErrorTextProps) {
  return (
    <Text color='red.500' data-testid='text' {...chakra}>
      {children}
    </Text>
  )
})
