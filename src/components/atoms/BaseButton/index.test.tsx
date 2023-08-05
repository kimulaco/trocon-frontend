import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { BaseButton } from '.'

const handleClick = vi.fn()

describe('<BaseButton>', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should show children', async () => {
    const { getByTestId } = render(<BaseButton>Button Text</BaseButton>)
    expect(getByTestId('button').textContent).toBe('Button Text')
  })

  it('should use chakra prop', async () => {
    const { getByTestId } = render(<BaseButton chakra={{ mt: '100px' }}>Button Text</BaseButton>)
    expect(getComputedStyle(getByTestId('root')).marginTop).toBe('100px')
  })

  it('should use buttonChakra prop', async () => {
    const { getByTestId } = render(
      <BaseButton buttonChakra={{ mt: '100px' }}>Button Text</BaseButton>,
    )
    expect(getComputedStyle(getByTestId('button')).marginTop).toBe('100px')
  })

  it('should call onClick when click button', async () => {
    const { getByTestId } = render(<BaseButton onClick={handleClick}>Button Text</BaseButton>)
    getByTestId('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be hidden if isHidden is true', async () => {
    const { getByTestId } = render(
      <BaseButton isHidden onClick={handleClick}>
        Button Text
      </BaseButton>,
    )
    const button = getByTestId('button')
    expect(getComputedStyle(button).visibility).toBe('hidden')

    const skeleton = getByTestId('skeleton-fade')
    await waitFor(() => {
      expect(skeleton.style.opacity).toBe('0')
    })

    button.click()
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  it('should show skeleton if isLoading is true', async () => {
    const { getByTestId } = render(
      <BaseButton isLoading onClick={handleClick}>
        Button Text
      </BaseButton>,
    )
    const button = getByTestId('button')
    expect(getComputedStyle(button).visibility).toBe('hidden')

    const skeleton = getByTestId('skeleton-fade')
    await waitFor(() => {
      expect(skeleton.style.opacity).toBe('1')
    })

    button.click()
    expect(handleClick).toHaveBeenCalledTimes(0)
  })
})
