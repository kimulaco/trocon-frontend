import { test, expect } from '@playwright/test'

test('should display title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Trocon/)
})

test('should go user page', async ({ page }) => {
  const TEST_STEAM_ID = '12345678901234567'

  await page.goto('/')
  await page.getByRole('textbox').fill(TEST_STEAM_ID)
  await page.getByRole('button', { name: 'Search' }).click()
  await page.waitForURL('**/user/**')

  const pathname = new URL(page.url()).pathname

  await expect(pathname).toBe(`/user/${TEST_STEAM_ID}`)
})

test('should show error when input is empty', async ({ page }) => {
  const ERROR_MESSAGE = 'Steam IDを入力してください。'

  await page.goto('/')

  await expect(await page.getByText(ERROR_MESSAGE)).not.toBeVisible()

  await page.getByRole('button', { name: 'Search' }).click()
  await expect(await page.getByText(ERROR_MESSAGE)).toBeVisible()
})

test('should show error when input is invalid', async ({ page }) => {
  const TEST_STEAM_ID = '1234567890'
  const ERROR_MESSAGE = 'Steam IDは17桁の数字である必要があります。'

  await page.goto('/')

  await expect(await page.getByText(ERROR_MESSAGE)).not.toBeVisible()

  await page.getByRole('textbox').fill(TEST_STEAM_ID)
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(await page.getByText(ERROR_MESSAGE)).toBeVisible()
})
