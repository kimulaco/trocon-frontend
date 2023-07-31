import React, { memo, useEffect, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useInView, IntersectionOptions } from 'react-intersection-observer'

export type IntersectionObserverContainerProps = {
  children?: ReactNode
  option?: IntersectionOptions
  onIntersecting?: (entry: IntersectionObserverEntry) => void
  onUnIntersecting?: (entry: IntersectionObserverEntry) => void
  chakra?: ChakraProps
}

export const IntersectionObserverContainer: FC<IntersectionObserverContainerProps> = memo(
  function IntersectionObserverContainer({
    children,
    option = {},
    onIntersecting,
    onUnIntersecting,
    chakra = {},
  }: IntersectionObserverContainerProps) {
    const { ref: rootRef, inView, entry } = useInView(option || {})

    useEffect(() => {
      if (inView) {
        if (entry && typeof onIntersecting === 'function') {
          onIntersecting(entry)
        }
      } else {
        if (entry && typeof onUnIntersecting === 'function') {
          onUnIntersecting(entry)
        }
      }
    }, [inView])

    return (
      <Box ref={rootRef} {...chakra}>
        {children}
      </Box>
    )
  },
)
