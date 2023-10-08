import { test, expect } from 'playwright-test-coverage'
import { createUser, createGames } from '@/mock/data/steam/user'

const TEST_STEAM_ID = '12345678901234567'

test('should display user info', async ({ page }) => {
  const testUser = createUser({ steamId: TEST_STEAM_ID })

  await page.goto(`/user/${TEST_STEAM_ID}`)

  await expect(await page.getByText(testUser.personaName)).toBeVisible()
})

test('should display games', async ({ page }) => {
  const testGames = createGames()

  await page.goto(`/user/${TEST_STEAM_ID}`)

  for (const testGame of testGames) {
    await expect(await page.getByRole('heading', { name: testGame.name })).toBeVisible()
  }
})
