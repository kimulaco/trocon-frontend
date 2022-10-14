import React, { memo, FC } from 'react'
import { Heading, Text, SkeletonText, HeadingProps } from '@chakra-ui/react'
import { formatDateByUnixtime } from '@/utils/time'
import { Game } from '@/types/steam'

export type GameViewMetaProps = {
  name: Game['name']
  rtimeLastPlayed: Game['rtimeLastPlayed']
  titleTagName?: HeadingProps['as']
  isLoading?: boolean
}

export const GameViewMeta: FC<GameViewMetaProps> = memo(function GameViewMeta({
  name,
  rtimeLastPlayed,
  titleTagName = 'h3',
  isLoading = false,
}: GameViewMetaProps) {
  return (
    <>
      {!isLoading ?
        <>
          <Heading
            fontSize='md'
            fontWeight='bold'
            as={titleTagName}
            wordBreak='break-word'
          >{name}</Heading>
          <Text fontSize='sm' mt={2}>{
            typeof rtimeLastPlayed=== 'number' && rtimeLastPlayed > 0 ?
              `最終プレイ日: ${formatDateByUnixtime(rtimeLastPlayed)}` :
              ''
          }</Text>
        </> :
        <>
          <SkeletonText noOfLines={1} mt={4}/>
        </>
      }
    </>
  )
})
