import { describe, expect, it } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { UserIcon } from '.'
import { createBase64DummySVG } from '@/test/helpers'

const svg = createBase64DummySVG()

describe('<UserIcon>', () => {
  it('should show img src', async () => {
    const { getByTestId } = render(<UserIcon src={svg} />)

    const img = getByTestId('img')
    expect(img.getAttribute('src')).toBe(svg)
    expect(img.getAttribute('alt')).toBe('')

    const box = getByTestId('box')
    const boxStyle = getComputedStyle(box)
    expect(boxStyle.width).toBe('92px')
    expect(boxStyle.height).toBe('92px')
  })

  it('should set img alt', async () => {
    const { getByTestId } = render(<UserIcon src={svg} alt='alt text' />)

    const img = getByTestId('img')
    expect(img.getAttribute('src')).toBe(svg)
    expect(img.getAttribute('alt')).toBe('alt text')
  })

  it('should set size', async () => {
    const { getByTestId } = render(<UserIcon src={svg} size='200px' />)

    const box = getByTestId('box')
    const boxStyle = getComputedStyle(box)
    expect(boxStyle.width).toBe('200px')
    expect(boxStyle.height).toBe('200px')
  })

  it('should use chakra prop', async () => {
    const { getByTestId } = render(<UserIcon src={svg} chakra={{ mt: '100px' }} />)
    expect(getComputedStyle(getByTestId('box')).marginTop).toBe('100px')
  })

  it('should show skeleton if isLoading is true', async () => {
    const { getByTestId } = render(<UserIcon src={svg} isLoading />)

    const skeleton = getByTestId('skeleton-fade')

    await waitFor(() => {
      expect(skeleton.style.opacity).toBe('1')
    })
  })
})
