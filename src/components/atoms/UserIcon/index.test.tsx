import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserIcon } from '.'
import { createBase64DummySVG } from '@/test/helpers'

const svg = createBase64DummySVG()

describe('<UserIcon>', () => {
  it('should show img src', async () => {
    render(<UserIcon src={svg} />)

    const img = screen.getByTestId('img')
    expect(img.getAttribute('src')).toBe(svg)
    expect(img.getAttribute('alt')).toBe('')

    const box = screen.getByTestId('box')
    const boxStyle = getComputedStyle(box)
    expect(boxStyle.width).toBe('92px')
    expect(boxStyle.height).toBe('92px')
  })

  it('should set img alt', async () => {
    render(<UserIcon src={svg} alt='alt text' />)

    const img = screen.getByTestId('img')
    expect(img.getAttribute('src')).toBe(svg)
    expect(img.getAttribute('alt')).toBe('alt text')
  })

  it('should set size', async () => {
    render(<UserIcon src={svg} size='200px' />)

    const box = screen.getByTestId('box')
    const boxStyle = getComputedStyle(box)
    expect(boxStyle.width).toBe('200px')
    expect(boxStyle.height).toBe('200px')
  })

  it('should use chakra prop', async () => {
    render(<UserIcon src={svg} chakra={{ mt: '100px' }} />)
    expect(getComputedStyle(screen.getByTestId('box')).marginTop).toBe('100px')
  })

  // TODO: add test for isLoading
})
