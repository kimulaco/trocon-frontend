import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ErrorTitle } from '.'

describe('<ErrorTitle>', () => {
  it('should usable no props', async () => {
    const { container } = render(<ErrorTitle />)
    const root = container.children[0]
    expect(root.tagName).toBe('DIV')
    expect(root.children).toHaveLength(0)
  })

  it('should render title and message', async () => {
    const { getByText } = render(<ErrorTitle title='Error' message='Unknown error' />)
    expect(getByText('Error').tagName).toBe('H2')
    expect(getByText('Unknown error').tagName).toBe('P')
  })

  it('should render children', async () => {
    const { getByText } = render(
      <ErrorTitle title='Error' message='Unknown error'>
        <p>Description message</p>
      </ErrorTitle>,
    )
    expect(getByText('Error').tagName).toBe('H2')
    expect(getByText('Unknown error').tagName).toBe('P')
    expect(getByText('Description message').tagName).toBe('P')
  })

  it('should usable chakra prop', async () => {
    const { container } = render(<ErrorTitle chakra={{ mt: '100px' }} />)
    const root = container.children[0]
    expect(getComputedStyle(root).marginTop).toBe('100px')
  })
})
