import React, { memo, FC } from 'react'
import {
  Heading as _Heading,
  HeadingProps,
  Grid as _Grid,
  GridProps,
  GridItem as _GridItem,
  GridItemProps,
} from '@chakra-ui/react'

export const Heading: FC<HeadingProps> = memo(function UserIcon(props) {
  return <_Heading {...props} />
})

export const Grid: FC<GridProps> = memo(function UserIcon(props) {
  return <_Grid {...props} />
})

export const GridItem: FC<GridItemProps> = memo(function UserIcon(props) {
  return <_GridItem {...props} />
})
