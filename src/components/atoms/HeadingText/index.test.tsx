import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { HeadingText } from '.'

describe('<HeadingText>', () => {
  it('should show children', async () => {
    const { getByTestId } = render(<HeadingText>Heading Text</HeadingText>)
    expect(getByTestId('heading').textContent).toBe('Heading Text')
  })

  it('should use chakra prop', async () => {
    const { getByTestId } = render(<HeadingText chakra={{ mt: '100px' }}>Heading Text</HeadingText>)
    expect(getComputedStyle(getByTestId('heading')).marginTop).toBe('100px')
  })
})
