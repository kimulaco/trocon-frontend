import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorText } from '.'

describe('<ErrorText>', () => {
  it('should show children', async () => {
    render(<ErrorText>Error message</ErrorText>)
    expect(screen.getByTestId('text').textContent).toBe('Error message')
  })

  it('should use chakra prop', async () => {
    render(<ErrorText chakra={{ mt: '100px' }}>Error message</ErrorText>)
    expect(getComputedStyle(screen.getByTestId('text')).marginTop).toBe('100px')
  })
})
