import React, { FC } from 'react'
import { Box, ChakraProps, Skeleton, SkeletonProps, Fade } from '@chakra-ui/react'

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

export const UserIcon: FC<UserIconProps> = ({
  src = '',
  alt = '',
  size = '92px',
  isLoading = false,
  chakra = {},
}) => {
  return (
    <Box
      w={size}
      h={size}
      borderRadius='md'
      overflow='hidden'
      position='relative'
      {...chakra || {}}
    >
      <Fade in={isLoading}>
        <Skeleton {...skeletonStyles} />
      </Fade>
      <img src={src} alt={alt || ''} />
    </Box>
  )
}
