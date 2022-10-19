import React, { memo, FC, ReactNode } from 'react'
import { Fade, ChakraProps } from '@chakra-ui/react'
import { Box, Button, Skeleton } from '@/components/chakra/'

export type GameTrophyProgressButtonProps = {
  isHidden?: boolean
  isLoading?: boolean
  children?: ReactNode
  chakra?: ChakraProps
  onClick?: () => void
}

export const GameTrophyProgressButton: FC<
  GameTrophyProgressButtonProps
> = memo(function GameTrophyProgressButton({
  isHidden,
  isLoading,
  children,
  chakra = {},
  onClick,
}: GameTrophyProgressButtonProps) {
  return (
    <Box position='relative' display='inline-flex' {...chakra}>
      <Button
        size='xs'
        borderRadius='sm'
        visibility={isLoading || isHidden ? 'hidden' : 'visible'}
        onClick={onClick}
      >
        {children}
      </Button>

      <Fade in={isLoading}>
        <Skeleton
          w='100%'
          h='100%'
          position='absolute'
          top='0'
          left='0'
          borderRadius='sm'
        />
      </Fade>
    </Box>
  )
})
