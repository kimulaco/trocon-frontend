import React, { memo, FC } from 'react'
import {
  Box as _Box,
  BoxProps,
  Flex as _Flex,
  FlexProps,
  Text as _Text,
  TextProps,
  Heading as _Heading,
  HeadingProps,
  Grid as _Grid,
  GridProps,
  GridItem as _GridItem,
  GridItemProps,
  Progress as _Progress,
  ProgressProps,
  Skeleton as _Skeleton,
  SkeletonProps,
  SkeletonText as _SkeletonText,
  SkeletonTextProps,
} from '@chakra-ui/react'

export const Box: FC<BoxProps> = memo(function Box(props) {
  return <_Box {...props} />
})

export const Flex: FC<FlexProps> = memo(function Flex(props) {
  return <_Flex {...props} />
})

export const Heading: FC<HeadingProps> = memo(function Heading(props) {
  return <_Heading {...props} />
})

export const Text: FC<TextProps> = memo(function Text(props) {
  return <_Text {...props} />
})

export const Grid: FC<GridProps> = memo(function Grid(props) {
  return <_Grid {...props} />
})

export const GridItem: FC<GridItemProps> = memo(function GridItem(props) {
  return <_GridItem {...props} />
})

export const Progress: FC<ProgressProps> = memo(function Progress(props) {
  return <_Progress {...props} />
})

export const Skeleton: FC<SkeletonProps> = memo(function Skeleton(props) {
  return <_Skeleton {...props} />
})

export const SkeletonText: FC<SkeletonTextProps> = memo(function SkeletonText(props) {
  return <_SkeletonText {...props} />
})
