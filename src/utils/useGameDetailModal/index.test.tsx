import { describe, expect, it } from 'vitest'
import { render, renderHook, act, fireEvent } from '@testing-library/react'
import { useGameDetailModal } from '.'
import { complatedGame } from '@/mock/data/game'
import { createDummyTropy } from '@/mock/data/steam/trophy'

const testGame = {
  ...complatedGame,
  trophies: createDummyTropy(complatedGame.appId).trophies,
}

describe('useGameDetailModal', () => {
  it('should show game details on modal', async () => {
    const { result } = renderHook(() => useGameDetailModal())
    const { getByTestId, getAllByTestId, rerender } = render(<result.current.GameDetailModal />)

    expect(result.current.isOpen).toBe(false)

    await act(async () => {
      await result.current.showModal(testGame)
    })

    rerender(<result.current.GameDetailModal />)

    expect(result.current.isOpen).toBe(true)

    expect(getByTestId('title').textContent).toBe(testGame.name)
    expect(getByTestId('img').getAttribute('src')).toBe(testGame.headerImgUrl)

    const trophyList = getAllByTestId('trophy')
    expect(trophyList.length).toBe(testGame.trophies.length)
    trophyList.forEach((trophy, index) => {
      expect(trophy.textContent).toBe(testGame.trophies[index].name)
    })
  })

  it('should hide modal by close button', async () => {
    const { result } = renderHook(() => useGameDetailModal())
    const { getByTestId, rerender } = render(<result.current.GameDetailModal />)

    expect(result.current.isOpen).toBe(false)

    await act(async () => {
      await result.current.showModal(testGame)
    })

    rerender(<result.current.GameDetailModal />)
    expect(result.current.isOpen).toBe(true)

    await act(async () => {
      await fireEvent.click(getByTestId('close'))
    })

    expect(result.current.isOpen).toBe(false)
  })

  it('should hide modal by hooks', async () => {
    const { result } = renderHook(() => useGameDetailModal())

    expect(result.current.isOpen).toBe(false)

    await act(async () => {
      await result.current.showModal(testGame)
    })

    expect(result.current.isOpen).toBe(true)

    await act(async () => {
      await result.current.hideModal()
    })

    expect(result.current.isOpen).toBe(false)
  })
})
