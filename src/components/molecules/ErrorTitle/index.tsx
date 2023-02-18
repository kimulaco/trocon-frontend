import React, { memo, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type ErrorTitleProps = {
  title?: string
  message?: string
  children?: ReactNode
  chakra?: ChakraProps
}

export const ErrorTitle: FC<ErrorTitleProps> = memo(function ErrorTitle({
  title,
  message,
  children,
  chakra = {},
}: ErrorTitleProps) {
  return (
    <Box mt='100px' mb='50px' textAlign='center' {...chakra}>
      {title && (
        <Box as='h2' fontSize='80px' fontWeight='bold'>
          {title}
        </Box>
      )}

      {message && (
        <Box as='p' fontSize='lg'>
          {message}
        </Box>
      )}

      {children && <Box mt='8'>{children}</Box>}
    </Box>
  )
})
