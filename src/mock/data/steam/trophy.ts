import { complatedGame, zeroGame, halfGame, noGame, failedGame } from '@/mock/data/steam/game'
import { GameTrophy } from '@/types/steam'

export const trophies: GameTrophy[] = [
  {
    appId: complatedGame.appId,
    gameName: complatedGame.name,
    success: true,
    trophies: [
      ...[...Array(10)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: 1,
          unlocktime: 1656147897,
        }
      }),
    ],
  },
  {
    appId: zeroGame.appId,
    gameName: zeroGame.name,
    success: true,
    trophies: [
      ...[...Array(5)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: 0,
          unlocktime: 0,
        }
      }),
    ],
  },
  {
    appId: halfGame.appId,
    gameName: halfGame.name,
    success: true,
    trophies: [
      ...[...Array(20)].map((_, i: number) => {
        const index = i + 1
        return {
          apiname: `DUMMY_TROPHY_PART_${index}`,
          name: `Dummy trophy part ${index}`,
          description: '',
          achieved: index <= 10 ? 1 : 0,
          unlocktime: index <= 10 ? 1656147897 : 0,
        }
      }),
    ],
  },
  {
    appId: noGame.appId,
    gameName: noGame.name,
    success: true,
    trophies: [],
  },
  {
    appId: failedGame.appId,
    gameName: '',
    success: false,
    trophies: [],
  },
]

export const createDummyTropy = (appid: number): GameTrophy => {
  const baseTrophy: GameTrophy = trophies[appid % trophies.length] || trophies[0]
  return {
    ...baseTrophy,
    appId: appid,
  }
}
