import { test as base } from '@playwright/test'

import { createOrderLookupActions } from './actions/orderLookupActions'

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
}

/**
 * Extende o teste com as ações da aplicação
 * @param page - A página do teste
 * @param use - A função de uso do teste
 * @returns A aplicação
 */
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page)
    }

    await use(app)
  },
})

export { expect } from '@playwright/test'

