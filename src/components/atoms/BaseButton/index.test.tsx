import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BaseButton } from '.'

describe('<BaseButton>', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should show children', async () => {
    render(<BaseButton>Button Text</BaseButton>)
    expect(screen.getByTestId('button').textContent).toBe('Button Text')
  })

  it('should use chakra prop', async () => {
    render(<BaseButton chakra={{ mt: '100px' }}>Button Text</BaseButton>)
    expect(getComputedStyle(screen.getByTestId('root')).marginTop).toBe('100px')
  })

  it('should use buttonChakra prop', async () => {
    render(<BaseButton buttonChakra={{ mt: '100px' }}>Button Text</BaseButton>)
    expect(getComputedStyle(screen.getByTestId('button')).marginTop).toBe('100px')
  })

  it('should call onClick when click button', async () => {
    const handleClick = vi.fn()
    render(<BaseButton onClick={handleClick}>Button Text</BaseButton>)
    screen.getByTestId('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be hidden if isHidden is true', async () => {
    const handleClick = vi.fn()
    render(
      <BaseButton isHidden onClick={handleClick}>
        Button Text
      </BaseButton>,
    )
    const button = screen.getByTestId('button')
    expect(getComputedStyle(button).visibility).toBe('hidden')

    button.click()
    expect(handleClick).toHaveBeenCalledTimes(0)

    // TODO: check to hide skeleton
  })

  it('should be hidden if isLoading is true', async () => {
    const handleClick = vi.fn()
    render(
      <BaseButton isLoading onClick={handleClick}>
        Button Text
      </BaseButton>,
    )
    const button = screen.getByTestId('button')
    expect(getComputedStyle(button).visibility).toBe('hidden')

    button.click()
    expect(handleClick).toHaveBeenCalledTimes(0)

    // TODO: check to show skeleton
  })
})
