import React, { memo, FC, ReactNode } from 'react'
import { ChakraProps, HeadingProps, As } from '@chakra-ui/react'
import { Box } from '@/components/chakra/'
import { GameViewMeta } from './meta'
import { GameViewHeader } from './header'
import { Game } from '@/types/steam'

export type GameViewProps = {
  game?: Game
  isLoading?: boolean
  rootTagName?: As
  titleTagName?: HeadingProps['as']
  chakra?: ChakraProps
  body?: ReactNode
}

export const GameView: FC<GameViewProps> = memo(function GameView({
  game,
  isLoading = false,
  rootTagName = 'div',
  titleTagName = 'h3',
  chakra,
  body,
}: GameViewProps) {
  return (
    <Box as={rootTagName} data-app-id={game?.appId || ''} {...(chakra || {})}>
      <GameViewHeader headerImgUrl={game?.headerImgUrl || ''} isLoading={isLoading} />
      <Box p={4} border='1px solid' borderTop='0' borderColor='gray.300' borderBottomRadius='sm'>
        <GameViewMeta name={game?.name || ''} titleTagName={titleTagName} isLoading={isLoading} />
        {body}
      </Box>
    </Box>
  )
})
