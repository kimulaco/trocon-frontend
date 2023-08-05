import { describe, expect, it } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { UserProfile } from '.'

const DUMMY_USER = {
  steamId: '12345678901234567',
  communityVisibilityState: 3,
  profileState: 1,
  personaName: 'Steam User Name',
  lastLogoff: 1665742035,
  profileUrl: 'https://steamcommunity.com',
  avatar: '',
  avatarMedium: '',
  avatarFull: '/mock/user-avatar.png',
}

describe('<UserProfile>', () => {
  it('should render user info', async () => {
    const { getByTestId } = render(<UserProfile user={DUMMY_USER} />)
    expect(getByTestId('img').getAttribute('src')).toBe(DUMMY_USER.avatarFull)
    expect(getByTestId('user-name').textContent).toBe(DUMMY_USER.personaName)
  })

  // TODO: Enable this test. broken <SkeletonText>.
  it.skip('should show skeleton if isLoading is true', async () => {
    const { getByTestId } = render(<UserProfile isLoading />)
    const skeleton = getByTestId('skeleton-fade')
    await waitFor(() => {
      expect(skeleton.style.opacity).toBe('0')
    })
  })

  it('should usable chakra prop', async () => {
    const { container } = render(<UserProfile chakra={{ mt: '100px' }} />)
    const root = container.children[0]
    expect(getComputedStyle(root).marginTop).toBe('100px')
  })
})
