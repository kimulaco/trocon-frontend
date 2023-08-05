import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSteam } from '.'
import { createUser, createGames } from '@/mock/data/steam'
import { createDummyTropy } from '@/mock/data/steam/trophy'

const USER = createUser()
const GAMES = createGames()

describe('useSteam', () => {
  it('should get steam user info', async () => {
    const steamId = '12345678901234567'
    const { result } = renderHook(() => useSteam())
    expect(result.current.user).toEqual({
      info: undefined,
      games: [],
      isLoading: false,
      error: undefined,
    })

    await act(async () => {
      await result.current.getUser(steamId)
    })

    expect(result.current.user).toEqual({
      info: { ...USER, steamId },
      games: GAMES.map((game) => {
        return { ...game, isLoadingTrophies: true }
      }),
      isLoading: false,
      error: undefined,
    })
  })

  it('should set error if steamid is invalid', async () => {
    const steamId = 'steamid'
    const { result } = renderHook(() => useSteam())

    await act(async () => {
      await result.current.getUser(steamId)
    })

    expect(result.current.user).toEqual({
      info: undefined,
      games: [],
      isLoading: false,
      error: {
        title: 'Error',
        message: 'Steamアカウントが見つかりませんでした。',
      },
    })
  })

  it('should set error if internal error', async () => {
    const steamId = '500'
    const { result } = renderHook(() => useSteam())

    await act(async () => {
      await result.current.getUser(steamId)
    })

    expect(result.current.user).toEqual({
      info: undefined,
      games: [],
      isLoading: false,
      error: {
        title: 'Error',
        message: 'エラーが発生しました。',
      },
    })
  })

  it('should get trophies', async () => {
    const steamId = '12345678901234567'
    const { result } = renderHook(() => useSteam())

    await act(async () => {
      await result.current.getUser(steamId)
    })

    await act(async () => {
      await result.current.getGameTrophy(steamId, [
        result.current.user.games[0].appId,
        result.current.user.games[1].appId,
      ])
    })

    expect(result.current.user.games[0]).toEqual({
      ...GAMES[0],
      isLoadingTrophies: false,
      isFailedGetTrophies: false,
      trophies: createDummyTropy(GAMES[0].appId).trophies,
    })
    expect(result.current.user.games[1]).toEqual({
      ...GAMES[1],
      isLoadingTrophies: false,
      isFailedGetTrophies: false,
      trophies: createDummyTropy(GAMES[1].appId).trophies,
    })
  })

  it('should not get trophies if not specify appids', async () => {
    const steamId = '12345678901234567'
    const { result } = renderHook(() => useSteam())

    await act(async () => {
      await result.current.getUser(steamId)
    })

    await act(async () => {
      await result.current.getGameTrophy(steamId, [])
    })

    expect(result.current.user).toEqual({
      info: { ...USER, steamId },
      games: GAMES.map((game) => {
        return { ...game, isLoadingTrophies: true }
      }),
      isLoading: false,
      error: undefined,
    })
  })

  it('should be empty if get trophies before get user info', async () => {
    const steamId = '12345678901234567'
    const { result } = renderHook(() => useSteam())

    await act(async () => {
      await result.current.getGameTrophy(steamId, [100, 101])
    })

    expect(result.current.user).toEqual({
      info: undefined,
      games: [],
      isLoading: false,
      error: undefined,
    })
  })
})
