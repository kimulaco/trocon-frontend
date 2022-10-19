import React, { memo, FC, useMemo, useCallback } from 'react'
import { ChakraProps } from '@chakra-ui/react'
import { Box, Flex, Progress, Skeleton } from '@/components/chakra/'
import { GameTrophyProgressButton } from './button'
import { Trophy } from '@/types/steam'

const getUnlockedTrophies = (trophies: Trophy[]): Trophy[] => {
  return trophies.filter((trophy: Trophy) => trophy.achieved)
}

export type GameTrophyProgressProps = {
  trophies?: Trophy[]
  isLoading?: boolean
  chakra?: ChakraProps
  onClickButton?: () => void
}

export const GameTrophyProgress: FC<GameTrophyProgressProps> = memo(function GameTrophyProgress({
  trophies = [],
  isLoading,
  chakra = {},
  onClickButton,
}: GameTrophyProgressProps) {
  const unlockedTrophies = useMemo<Trophy[]>(() => {
    return getUnlockedTrophies(trophies)
  }, [trophies])

  const rate = useMemo<number>(() => {
    if (trophies.length <= 0) {
      return 0
    }
    return (unlockedTrophies.length / trophies.length) * 100
  }, [unlockedTrophies, trophies])

  const handleClickButton = useCallback(() => {
    if (typeof onClickButton === 'function') {
      onClickButton()
    }
  }, [onClickButton])

  return (
    <Box>
      <Flex
        w='100%'
        alignItems='center'
        {...chakra || {}}
      >
        {isLoading && (
          <>
            <Skeleton w='100%' h='14px' />
            <Skeleton minW='104px' h='14px' ml='2' />
          </>
        )}

        {!isLoading && (
          <>
            <Progress
              w='100%'
              h='14px'
              value={rate}
              colorScheme={rate >= 100 ? 'green' : 'blue'}
            />
            <Box
              minW='104px'
              ml='2'
              fontSize='sm'
              textAlign='right'
              lineHeight={1}
              flexShrink={0}
            >
              {`${Math.floor(rate)}% (${unlockedTrophies.length}/${trophies.length})`}
            </Box>
          </>
        )}
      </Flex>

      <Flex>
        <GameTrophyProgressButton
          isLoading={isLoading}
          isHidden={!isLoading && trophies.length <= 0}
          chakra={{mt: 3, ml: 'auto'}}
          onClick={handleClickButton}
        >
          Show detail
        </GameTrophyProgressButton>
      </Flex>
    </Box>
  )
})
