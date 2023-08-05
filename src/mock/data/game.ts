import { Game } from '../../types/steam'

export const complatedGame: Game = {
  appId: 100,
  name: 'Completed Game',
  iconImgUrl: '/mock/game-icon.png',
  headerImgUrl: '/mock/game-header.png',
  storeUrl: 'https://store.steampowered.com',
  hasCommunityVisibleStats: true,
  playtime: 447,
  rtimeLastPlayed: 1656596824,
}

export const halfGame: Game = {
  appId: 101,
  name: 'Half Game',
  iconImgUrl: '/mock/game-icon.png',
  headerImgUrl: '/mock/game-header.png',
  storeUrl: 'https://store.steampowered.com',
  hasCommunityVisibleStats: true,
  playtime: 447,
  rtimeLastPlayed: 1656596824,
}

export const zeroGame: Game = {
  appId: 102,
  name: 'Zero Game',
  iconImgUrl: '/mock/game-icon.png',
  headerImgUrl: '/mock/game-header.png',
  storeUrl: 'https://store.steampowered.com',
  hasCommunityVisibleStats: true,
  playtime: 447,
  rtimeLastPlayed: 1656596824,
}

export const noGame: Game = {
  appId: 103,
  name: 'No Game',
  iconImgUrl: '/mock/game-icon.png',
  headerImgUrl: '/mock/game-header.png',
  storeUrl: 'https://store.steampowered.com',
  hasCommunityVisibleStats: true,
  playtime: 447,
  rtimeLastPlayed: 1656596824,
}

export const failedGame: Game = {
  appId: 104,
  name: 'Failed Game',
  iconImgUrl: '/mock/game-icon.png',
  headerImgUrl: '/mock/game-header.png',
  storeUrl: 'https://store.steampowered.com',
  hasCommunityVisibleStats: true,
  playtime: 447,
  rtimeLastPlayed: 1656596824,
}

export const games: Readonly<Game[]> = [complatedGame, zeroGame, halfGame, noGame, failedGame]
