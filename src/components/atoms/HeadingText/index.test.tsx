import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeadingText } from '.'

describe('<HeadingText>', () => {
  it('should show children', async () => {
    render(<HeadingText>Heading Text</HeadingText>)
    expect(screen.getByTestId('heading').textContent).toBe('Heading Text')
  })

  it('should use chakra prop', async () => {
    render(<HeadingText chakra={{ mt: '100px' }}>Heading Text</HeadingText>)
    expect(getComputedStyle(screen.getByTestId('heading')).marginTop).toBe('100px')
  })
})
