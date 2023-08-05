import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AppInner } from '.'

describe('<AppInner>', () => {
  it('should usable no props', async () => {
    const { container } = render(
      <AppInner>
        <p>Inner content</p>
      </AppInner>,
    )
    expect(container.children[0].textContent).toBe('Inner content')

    const style = getComputedStyle(container.children[0])
    expect(style.minWidth).toBe('var(--app-inner-min-width)')
    expect(style.paddingLeft).not.toBe('0')
    expect(style.paddingRight).not.toBe('0')
  })

  it('should usable type="center"', async () => {
    const { container } = render(
      <AppInner type='center'>
        <p>Inner content</p>
      </AppInner>,
    )
    const style = getComputedStyle(container.children[0])
    expect(style.minWidth).toBe('var(--app-inner-min-width)')
    expect(style.paddingLeft).not.toBe('0')
    expect(style.paddingRight).not.toBe('0')
  })

  it('should usable type="full"', async () => {
    const { container } = render(
      <AppInner type='full'>
        <p>Inner content</p>
      </AppInner>,
    )
    const style = getComputedStyle(container.children[0])
    expect(style.minWidth).toBe('auto')
    expect(style.paddingLeft).toBe('')
    expect(style.paddingRight).toBe('')
  })

  it('should usable chakra prop', async () => {
    const { container } = render(
      <AppInner chakra={{ mt: '100px' }}>
        <p>Inner content</p>
      </AppInner>,
    )
    expect(getComputedStyle(container.children[0]).marginTop).toBe('100px')
  })
})
