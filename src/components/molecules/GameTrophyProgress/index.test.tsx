import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { GameTrophyProgress } from '.'
import { Trophy } from '@/types/steam'

const createTrohpy = (trophy?: Partial<Trophy>): Trophy => {
  return {
    apiname: `DUMMY_TROPHY`,
    name: `Dummy trophy`,
    description: '',
    achieved: 0,
    unlocktime: 1656147897,
    ...trophy,
  }
}

describe('<GameTrophyProgress>', () => {
  describe('should be correct progress value', () => {
    it('no trophies', async () => {
      const { getByRole, getByTestId } = render(<GameTrophyProgress />)

      const progressbar = getByRole('progressbar')
      expect(progressbar.getAttribute('aria-valuemax')).toBe('100')
      expect(progressbar.getAttribute('aria-valuemin')).toBe('0')
      expect(progressbar.getAttribute('aria-valuenow')).toBe('0')
      expect(progressbar.style.width).toBe('0%')

      const label = getByTestId('label')
      expect(label.textContent).toBe('0% (0/0)')
    })

    it('100%', async () => {
      const trophies = [...Array(10)].map(() => {
        return createTrohpy({ achieved: 1 })
      })
      const { getByRole, getByTestId } = render(<GameTrophyProgress trophies={trophies} />)

      const progressbar = getByRole('progressbar')
      expect(progressbar.getAttribute('aria-valuemax')).toBe('100')
      expect(progressbar.getAttribute('aria-valuemin')).toBe('0')
      expect(progressbar.getAttribute('aria-valuenow')).toBe('100')
      expect(progressbar.style.width).toBe('100%')
      // expect(getComputedStyle(progressbar).backgroundColor).toBe('var(--chakra-colors-green-500)')

      const label = getByTestId('label')
      expect(label.textContent).toBe('100% (10/10)')
    })

    it('60%', async () => {
      const trophies = [...Array(10)].map((_, i) => {
        return createTrohpy({ achieved: i < 6 ? 1 : 0 })
      })
      const { getByRole, getByTestId } = render(<GameTrophyProgress trophies={trophies} />)

      const progressbar = getByRole('progressbar')
      expect(progressbar.getAttribute('aria-valuemax')).toBe('100')
      expect(progressbar.getAttribute('aria-valuemin')).toBe('0')
      expect(progressbar.getAttribute('aria-valuenow')).toBe('60')
      expect(progressbar.style.width).toBe('60%')
      // expect(getComputedStyle(progressbar).backgroundColor).toBe('var(--chakra-colors-blue-500)')

      const label = getByTestId('label')
      expect(label.textContent).toBe('60% (6/10)')
    })
  })

  // TODO: should render skeleton

  it('should usable chakra prop', async () => {
    const { container } = render(<GameTrophyProgress chakra={{ mt: '100px' }} />)
    const root = container.children[0]
    expect(getComputedStyle(root).marginTop).toBe('100px')
  })
})
