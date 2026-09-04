import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import type { OrderDetails } from '../support/actions/orderLookupActions'
import { insertOrder, deleteOrderByNumber } from '../support/database/orderRepository'
import testData from '../support/fixtures/orders.json' with { type: 'json' }

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order = testData.aprovado as OrderDetails

    await deleteOrderByNumber(order.number)
    await insertOrder(order)

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order = testData.reprovado as OrderDetails

    await deleteOrderByNumber(order.number)
    await insertOrder(order)

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order = testData.em_analise as OrderDetails

    await deleteOrderByNumber(order.number)
    await insertOrder(order)

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLookup.searchOrder(order)
    await app.orderLookup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o pedido é inválido', async ({ app }) => {
    const order = 'VLO-INVALID'
    await app.orderLookup.searchOrder(order)
    await app.orderLookup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado quando o campo de busca estiver vazio', async ({ app }) => {
    const button = app.orderLookup.elements.searchButton
    const input = app.orderLookup.elements.orderInput

    await expect(button).toBeDisabled()
    await input.fill(' ')
    await expect(button).toBeDisabled()

  })
})