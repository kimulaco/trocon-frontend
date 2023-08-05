import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ErrorText } from '.'

describe('<ErrorText>', () => {
  it('should show children', async () => {
    const { getByTestId } = render(<ErrorText>Error message</ErrorText>)
    expect(getByTestId('text').textContent).toBe('Error message')
  })

  it('should use chakra prop', async () => {
    const { getByTestId } = render(<ErrorText chakra={{ mt: '100px' }}>Error message</ErrorText>)
    expect(getComputedStyle(getByTestId('text')).marginTop).toBe('100px')
  })
})
