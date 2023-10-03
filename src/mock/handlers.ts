import { handler as SteamUserHandler } from './api/SteamUser'
import { handler as SteamUserTrophyHandler } from './api/SteamUserTrophy'
import { handler as SteamUserSearchHandler } from './api/SteamUserSearch'

export const handlers = [SteamUserSearchHandler, SteamUserHandler, SteamUserTrophyHandler]
