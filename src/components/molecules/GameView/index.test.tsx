import { describe, expect, it } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { GameView } from '.'
import { complatedGame } from '@/mock/data/steam/game'

describe('<GameView>', () => {
  it('should be correct to renderd game info', async () => {
    const { getByTestId } = render(<GameView game={complatedGame} />)

    const img = getByTestId('game-view-header-img')
    expect(img.getAttribute('src')).toBe(complatedGame.headerImgUrl)
    expect(img.style.opacity).toBe('1')

    const title = getByTestId('game-view-meta-name')
    expect(title.textContent).toBe(complatedGame.name)
    expect(title.tagName).toBe('H3')
  })

  it('should set rootTagName props', async () => {
    const { container } = render(<GameView game={complatedGame} rootTagName='section' />)

    const root = container.children[0]
    expect(root.tagName).toBe('SECTION')
  })

  it('should set titleTagName props', async () => {
    const { getByTestId } = render(<GameView game={complatedGame} titleTagName='h4' />)

    const title = getByTestId('game-view-meta-name')
    expect(title.tagName).toBe('H4')
  })

  it('should set body props', async () => {
    const { getByTestId } = render(<GameView body={<p data-testid='game-view-body'>body</p>} />)

    const body = getByTestId('game-view-body')
    expect(body.textContent).toBe('body')
    expect(body.tagName).toBe('P')
  })

  it('should usable no props', async () => {
    const { getByTestId } = render(<GameView />)

    const img = getByTestId('game-view-header-img')
    expect(img.getAttribute('src')).toBe('')

    const title = getByTestId('game-view-meta-name')
    expect(title.textContent).toBe('')
    expect(title.tagName).toBe('H3')
  })

  // TODO: Enable this test. broken <SkeletonText>.
  it.skip('should show skeleton if isLoading is true', async () => {
    const { getByTestId } = render(<GameView isLoading />)
    const skeletonHeader = getByTestId('skeleton-fade-header')
    const skeletonMeta = getByTestId('skeleton-fade-meta')
    await waitFor(() => {
      expect(skeletonHeader.style.opacity).toBe('0')
      expect(skeletonMeta.style.opacity).toBe('0')
    })
  })
})
