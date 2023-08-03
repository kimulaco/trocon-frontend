import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AppLayout } from '.'

describe('<AppLayout>', () => {
  it('should usable no props', async () => {
    const { getByTestId } = render(<AppLayout />)
    const container = getByTestId('container')
    expect(container.children).toHaveLength(1)
    expect(container.children[0].tagName).toBe('FOOTER')
  })

  it('should render children', async () => {
    const { getByTestId } = render(
      <AppLayout>
        <main>main content</main>
      </AppLayout>,
    )
    const container = getByTestId('container')
    expect(container.children).toHaveLength(2)
    expect(container.children[0].tagName).toBe('MAIN')
    expect(container.children[1].tagName).toBe('FOOTER')
  })

  it('should usable chakra prop', async () => {
    const { getByTestId } = render(<AppLayout chakra={{ mt: '100px' }} />)
    const container = getByTestId('container')
    expect(getComputedStyle(container).marginTop).toBe('100px')
  })
})
