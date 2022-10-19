import React, { memo, useState, useMemo, useEffect, useRef, FC, ReactNode } from 'react'
import { Box, ChakraProps } from '@chakra-ui/react'

export type IntersectionObserverProps = {
  children?: ReactNode
  option?: IntersectionObserverInit
  disabled?: boolean
  onceIntersecting?: boolean
  onceUnIntersecting?: boolean
  onIntersecting?: (entry: IntersectionObserverEntry) => void
  onUnIntersecting?: (entry: IntersectionObserverEntry) => void
  chakra?: ChakraProps
}

export const IntersectionObserverContainer: FC<IntersectionObserverProps> = memo(function UserIcon({
  children,
  option = {},
  disabled = false,
  onceIntersecting = false,
  onceUnIntersecting = false,
  onIntersecting,
  onUnIntersecting,
  chakra = {},
}: IntersectionObserverProps) {
  const root = useRef<HTMLDivElement | null>(null)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)

  const disconnectObserver = useMemo(() => {
    return () => {
      if (!observer) return
      observer.disconnect()
      setObserver(null)
    }
  }, [observer, setObserver])

  const initObserver = useMemo(() => {
    return () =>{
      if (!root?.current || observer) return

      const _observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          if (typeof onIntersecting === 'function') {
            onIntersecting(entry)
          }
          if (onceIntersecting) {
            disconnectObserver()
          }
        } else {
          if (typeof onUnIntersecting === 'function') {
            onUnIntersecting(entry)
          }
          if (onceUnIntersecting) {
            disconnectObserver()
          }
        }
      }, option || {});

      setObserver(_observer)
    }
  }, [
    root,
    option,
    observer,
    setObserver,
    onIntersecting,
    onUnIntersecting,
    onceIntersecting,
    onceUnIntersecting,
    disconnectObserver,
  ])

  useEffect(() => {
    if (disabled) {
      disconnectObserver()
    } else {
      initObserver()
    }
  }, [disabled])

  useEffect(() => {
    if (observer && root?.current) {
      observer.observe(root.current)
    }
  }, [root, observer])

  useEffect(() => {
    return () => {
      disconnectObserver()
    }
  }, []);

  return (
    <Box
      ref={root}
      {...chakra}
    >
      {children}
    </Box>
  )
})
