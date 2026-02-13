import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
  const orderId = 'VLO-X7NNRD'

  await page.goto('http://localhost:5173/')

  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByLabel('Número do Pedido').fill(orderId)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  await expect(page.locator('//p[text()="Pedido"]')).toBeVisible()
  await expect(page.locator(`//p[text()="${orderId}"]`)).toBeVisible()

  await expect(page.locator('//div[text()="APROVADO"]')).toBeVisible()
})