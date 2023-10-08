export type User = {
  steamId: string
  communityVisibilityState: number
  profileState: number
  personaName: string
  lastLogoff: number
  profileUrl: string
  avatar: string
  avatarMedium: string
  avatarFull: string
}

export type Game = {
  appId: number
  name: string
  iconImgUrl: string
  headerImgUrl: string
  storeUrl: string
  hasCommunityVisibleStats: boolean
  playtime: number
  rtimeLastPlayed: number
  trophies?: Trophy[]
  isFailedGetTrophies?: boolean
  isLoadingTrophies?: boolean
}

export type Trophy = {
  apiname: string
  name: string
  description: string
  achieved: number
  unlocktime: number
}

export type GameTrophy = {
  success: boolean
  appId: number
  gameName: string
  trophies: Trophy[]
}
