import React, { FC, useMemo } from 'react'
import { Flex, Box, ChakraProps, Progress } from '@chakra-ui/react'
import { Trophy } from '@/types/steam'

const getUnlockedTrophies = (trophies: Trophy[]): Trophy[] => {
  return trophies.filter((trophy: Trophy) => trophy.achieved)
}

export type GameTrophyProgressProps = {
  trophies?: Trophy[]
  isLoading?: boolean
  chakra?: ChakraProps
}

export const GameTrophyProgress: FC<GameTrophyProgressProps> = ({
  trophies = [],
  chakra = {},
}) => {
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
      />
      <Box
        minW='104px'
        ml='4'
        fontSize='sm'
        textAlign='right'
        flexShrink={0}
      >
        {`${Math.floor(rate)}% (${unlockedTrophies.length}/${trophies.length})`}
      </Box>
    </Flex>
  )
}
