import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { TopTitle } from '.'

describe('<TopTitle>', () => {
  it('should render children', async () => {
    const { getByText } = render(<TopTitle>Title Text</TopTitle>)
    const title = getByText('Title Text')
    expect(title.tagName).toBe('H1')
  })

  it('should usable chakra prop', async () => {
    const { getByText } = render(<TopTitle chakra={{ mt: '100px' }}>Title Text</TopTitle>)
    const title = getByText('Title Text')
    expect(getComputedStyle(title).marginTop).toBe('100px')
  })
})
