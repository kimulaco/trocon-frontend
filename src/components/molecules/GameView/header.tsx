import React, { memo, FC } from 'react'
import { Box, Skeleton, Fade } from '@chakra-ui/react'
import { Game } from '@/types/steam'

export type GameViewHeaderProps = {
  headerImgUrl: Game['headerImgUrl']
  isLoading?: boolean
}

export const GameViewHeader: FC<GameViewHeaderProps> = memo(function GameViewHeader({
  headerImgUrl = '',
  isLoading = false,
}: GameViewHeaderProps) {
  return (
    <Box
        borderTopRadius='sm'
        overflow='hidden'
        position='relative'
        zIndex={0}
      >
        <img
          src={headerImgUrl || ''}
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
  )
})
