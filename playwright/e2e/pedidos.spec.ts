import { test, expect } from '@playwright/test'
import { generateOrderId } from '../support/helpers';

test.describe('Pedidos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')

    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
    const orderId = generateOrderId()
    const orderStatus = 'APROVADO'

    await page.getByLabel('Número do Pedido').fill(orderId)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    const containerPedido = page.getByRole('paragraph')
      .filter({ hasText: /^Pedido$/ })
      .locator('..') //Sobe para o elemento pai (a div que agrupa ambos)

    await expect(containerPedido).toContainText(orderId, { timeout: 10_000 })

    await expect(page.getByText(orderStatus)).toBeVisible()
  })

  test('deve exibir uma mensagem quando o pedido não é encontrado', async ({ page }) => {
    const orderId = generateOrderId()

    await page.getByLabel('Número do Pedido').fill(orderId)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);

  })
})

