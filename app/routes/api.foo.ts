import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

import { getWebRequest } from 'vinxi/http'

export const Route = createAPIFileRoute('/api/foo')({
  GET: async ({ request, params }) => {
    console.log('AAAAA')
    const req = getWebRequest()

    const cookiesInApiRoute = req.headers.get('Cookie')
    console.log('Cookies in api route from context', {
      cookies: cookiesInApiRoute,
    })

    // console.log('\n\n---------------------------------------\n\n')

    // for (const x of request.headers) {
    //   console.log(x[0], x[1])
    // }
    const cookies =
      request.headers.get('Cookie') || request.headers.get('cookie')
    console.log({ cookies })

    return json({
      id: 1,
      name: 'foo',
    })
  },
})
