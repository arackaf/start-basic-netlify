import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getServerTime } from '~/getServerTime'

export const Route = createFileRoute('/')({
  component: Home,
  async loader({ context }) {
    try {
      const x = await getServerTime()
      console.log('Server Function Result', { x })
    } catch (er) {
      console.log('server function call failed', { er })
    }
    try {
      console.log('Calling')
      await fetch('http://localhost:3000/api/foo')
        .then((resp) => resp.text())
        .then((json) => {
          console.log({ json })
        })
    } catch (err) {
      console.log('error calling api', { err })
    }

    await context.queryClient.ensureQueryData({
      queryKey: ['epics'],
      queryFn: async () => {
        console.log('LOADING EPICS ...')
        return fetch('http://localhost:3001/epics')
          .then((resp) => resp.json())
          .then((resp) => {
            console.log('EPICS', resp)
            return resp
          })
      },
    })

    const val = +new Date()

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('Server loader', val)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    return {
      a: val,
    }
  },
  staleTime: 1000 * 10,
  gcTime: 1000 * 10,
})

function Home() {
  const data = Route.useLoaderData()
  const { isLoading, data: epics } = useQuery({
    queryKey: ['epics'],
    queryFn: async () => {
      console.log('LOADING EPICS ...')
      return fetch('http://localhost:3001/epics')
        .then((resp) => resp.json())
        .then((resp) => {
          console.log('EPICS', resp)
          return resp
        })
    },
    staleTime: 1000 * 60,
  })

  return (
    <div className="p-2">
      <h3>Welcome Home!!! {data.a}</h3>
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <div>
          {epics.map((epic: any) => (
            <div key={epic.id}>{epic.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}
