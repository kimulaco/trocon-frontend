import React, { memo, FC } from 'react'
import { HeadingProps } from '@chakra-ui/react'
import { Heading, SkeletonText } from '@/components/chakra/'
import { Game } from '@/types/steam'

export type GameViewMetaProps = {
  name: Game['name']
  titleTagName?: HeadingProps['as']
  isLoading?: boolean
}

export const GameViewMeta: FC<GameViewMetaProps> = memo(function GameViewMeta({
  name,
  titleTagName = 'h3',
  isLoading = false,
}: GameViewMetaProps) {
  return (
    <>
      {!isLoading ? (
        <>
          <Heading fontSize='md' fontWeight='bold' as={titleTagName} wordBreak='break-word'>
            {name}
          </Heading>
        </>
      ) : (
        <>
          <SkeletonText noOfLines={1} mt={4} mb='13px' />
        </>
      )}
    </>
  )
})
