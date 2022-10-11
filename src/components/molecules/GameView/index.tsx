import React, { FC } from 'react'
import { Box, Heading, Text, Skeleton, SkeletonText, Fade, ChakraProps, HeadingProps } from '@chakra-ui/react'
import { formatDateByUnixtime } from '@/utils/time'
import { Game } from '@/types/steam'

export type GameViewProps = {
  game?: Game
  isLoading?: boolean
  titleTagName?: HeadingProps['as']
  chakra?: ChakraProps
}

export const GameView: FC<GameViewProps> = ({
  game,
  isLoading = false,
  titleTagName = 'h3',
  chakra = {},
}) => {
  return (
    <Box {...chakra || {}}>
      <Box
        borderRadius='sm'
        overflow='hidden'
        position='relative'
        zIndex={0}
      >
        <img
          src={game?.headerImgUrl || ''}
          alt=""
          width={460}
          height={215}
          loading="lazy"
          style={{
            opacity: isLoading ? 0 : 1,
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />
        <Fade in={isLoading}>
          <Skeleton
            w='100%'
            h='100%'
            position='absolute'
            top='0'
            left='0'
            opacity={1}
            zIndex={1}
            pointerEvents='none'
          />
        </Fade>
      </Box>
      <Box>
        {!isLoading ?
          <>
            <Heading
              fontSize='md'
              fontWeight='bold'
              mt={2}
              as={titleTagName}
            >{game?.name || ''}</Heading>
            <Text fontSize='sm' mt={2}>{
              typeof game?.rtimeLastPlayed === 'number' && game.rtimeLastPlayed > 0 ?
                `最終プレイ日: ${formatDateByUnixtime(game?.rtimeLastPlayed)}` :
                ''
            }</Text>
          </> :
          <>
            <SkeletonText noOfLines={1} mt={4}/>
          </>
        }
      </Box>
    </Box>
  )
}
