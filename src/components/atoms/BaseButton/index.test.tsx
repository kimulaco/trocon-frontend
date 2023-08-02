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

  it('should call onClick when click button', async () => {
    const handleClick = vi.fn()
    render(<BaseButton onClick={handleClick}>Button Text</BaseButton>)
    screen.getByTestId('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // TODO: add test isHidden, isLoading
})
