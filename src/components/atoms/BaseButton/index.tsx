import React, { memo, FC, ReactNode } from 'react'
import { Fade, ChakraProps, ButtonProps } from '@chakra-ui/react'
import { Box, Button, Skeleton } from '@/components/chakra/'

export type BaseButtonProps = {
  isHidden?: boolean
  isLoading?: boolean
  children?: ReactNode
  chakra?: ChakraProps
  buttonChakra?: ButtonProps
  onClick?: () => void
}

export const BaseButton: FC<BaseButtonProps> = memo(function BaseButton({
  isHidden,
  isLoading,
  children,
  chakra = {},
  buttonChakra = {},
  onClick,
}: BaseButtonProps) {
  const handleClick = () => {
    if (typeof onClick === 'function' && !isLoading && !isHidden) {
      onClick()
    }
  }

  return (
    <Box position='relative' display='inline-flex' data-testid='root' {...chakra}>
      <Button
        size='xs'
        borderRadius='sm'
        visibility={isLoading || isHidden ? 'hidden' : 'visible'}
        onClick={handleClick}
        data-testid='button'
        {...buttonChakra}
      >
        {children}
      </Button>

      <Fade in={isLoading} data-testid='skeleton-fade'>
        <Skeleton w='100%' h='100%' position='absolute' top='0' left='0' borderRadius='sm' />
      </Fade>
    </Box>
  )
})
