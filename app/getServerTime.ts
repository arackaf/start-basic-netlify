import { createServerFn } from '@tanstack/start'

import { getWebRequest } from 'vinxi/http'

export const getServerTime = createServerFn('GET', async () => {
  const req = getWebRequest()

  const cookies = req.headers.get('Cookie')
  console.log('Cookies in server function', { cookies })

  // Return the current time
  return new Date().toISOString()
})
