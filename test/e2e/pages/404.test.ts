import { test, expect } from 'playwright-test-coverage'

test('should display title when /404', async ({ page }) => {
  await page.goto('/404')
  await expect(await page.getByRole('heading', { name: '404' })).toBeVisible()
  await expect(await page.getByText('ページが見つかりませんでした。')).toBeVisible()
})

test('should redirect to /404 when unknown path', async ({ page }) => {
  await page.goto('/unknown')
  await expect(await page.getByRole('heading', { name: '404' })).toBeVisible()
  await expect(await page.getByText('ページが見つかりませんでした。')).toBeVisible()
})

test('should redirect to top when click top link', async ({ page }) => {
  await page.goto('/404')
  await page.getByRole('link', { name: 'Top page' }).click()
  await page.waitForURL(/.+?\/$/)

  const pathname = new URL(page.url()).pathname

  await expect(pathname).toBe('/')
})
