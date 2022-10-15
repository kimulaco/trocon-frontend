import React, { memo, FC, useMemo } from 'react'
import { ChakraProps } from '@chakra-ui/react'
import { Box, Flex, Progress } from '@/components/chakra/'
import { Trophy } from '@/types/steam'

const getUnlockedTrophies = (trophies: Trophy[]): Trophy[] => {
  return trophies.filter((trophy: Trophy) => trophy.achieved)
}

export type GameTrophyProgressProps = {
  trophies?: Trophy[]
  isLoading?: boolean
  chakra?: ChakraProps
}

export const GameTrophyProgress: FC<GameTrophyProgressProps> = memo(function GameTrophyProgress({
  trophies = [],
  chakra = {},
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

  return (
    <Flex
      w='100%'
      alignItems='center'
      {...chakra || {}}
    >
      <Progress
        w='100%'
        value={rate}
        colorScheme={rate >= 100 ? 'green' : 'blue'}
      />
      <Box
        minW='104px'
        ml='2'
        fontSize='sm'
        textAlign='right'
        flexShrink={0}
      >
        {`${Math.floor(rate)}% (${unlockedTrophies.length}/${trophies.length})`}
      </Box>
    </Flex>
  )
})
