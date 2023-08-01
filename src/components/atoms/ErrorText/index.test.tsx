import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorText } from '.'

describe('<ErrorText>', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should show children', async () => {
    render(<ErrorText>Error message</ErrorText>)
    expect(screen.getByTestId('text').textContent).toBe('Error message')
  })
})
