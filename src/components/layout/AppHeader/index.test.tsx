import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AppHeader } from '.'

describe('<AppHeader>', () => {
  it('should show img src', async () => {
    const { getByTestId } = render(<AppHeader />)

    const title = getByTestId('title')
    expect(title.getAttribute('href')).toBe('/')
    expect(title.textContent).toBe('Trocon')
  })

  it('should usable chakra prop', async () => {
    const { container } = render(<AppHeader chakra={{ mt: '100px' }} />)
    expect(getComputedStyle(container.children[0]).marginTop).toBe('100px')
  })
})
