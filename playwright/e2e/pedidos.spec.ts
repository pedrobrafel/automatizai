import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLookupActions'

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLookup.open()
  })
 
  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-X7NNRD',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Pedro Felix',
        email: 'pbrafel@automatiza.dev'
      },
      payment: 'À Vista'
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-WSHVU0',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'John Doe',
        email: 'johndoe@automatiza.dev'
      },
      payment: 'À Vista'
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-AG0RXZ',
      status: 'EM ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Avel Ocidade',
        email: 'avel@automatiza.dev'
      },
      payment: 'À Vista'
    }

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
})