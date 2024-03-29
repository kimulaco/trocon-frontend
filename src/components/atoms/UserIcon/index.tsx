import React, { memo, FC } from 'react'
import { ChakraProps, SkeletonProps, Fade } from '@chakra-ui/react'
import { Box, Skeleton } from '@/components/chakra/'

export type UserIconProps = {
  src: string
  alt?: string
  size?: string
  isLoading?: boolean
  chakra?: ChakraProps
}

const skeletonStyles: SkeletonProps = {
  w: '100%',
  h: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  pointerEvents: 'none',
}

export const UserIcon: FC<UserIconProps> = memo(function UserIcon({
  src = '',
  alt = '',
  size = '92px',
  isLoading = false,
  chakra,
}: UserIconProps) {
  return (
    <Box
      w={size}
      h={size}
      borderRadius='md'
      overflow='hidden'
      position='relative'
      data-testid='box'
      {...(chakra || {})}
    >
      <Fade in={isLoading} data-testid='skeleton-fade'>
        <Skeleton {...skeletonStyles} />
      </Fade>
      <img src={src} alt={alt || ''} data-testid='img' />
    </Box>
  )
})
