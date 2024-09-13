import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/suspense/')({
  component: Home,
  async loader({ context }) {
    context.queryClient.prefetchQuery({
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
    context.queryClient.prefetchQuery({
      queryKey: ['epics2'],
      queryFn: async () => {
        console.log('LOADING EPICS2 ...')
        return fetch('http://localhost:3001/epics')
          .then((resp) => resp.json())
          .then((resp) => {
            console.log('EPICS', resp)
            return resp
          })
      },
    })

    const val = +new Date()
    console.log('\n\n')
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('Server loader', val)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('\n\n')

    return {
      a: val,
    }
  },
  staleTime: 1000 * 10,
  gcTime: 1000 * 10,
})

function Home() {
  return (
    <Suspense fallback={<span>Loading Suspense ...</span>}>
      <Data />
    </Suspense>
  )
}
function Data() {
  const data = Route.useLoaderData()
  const { data: epics } = useSuspenseQuery({
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

  const { data: epics2 } = useSuspenseQuery({
    queryKey: ['epics2'],
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

      <div>
        {epics.map((epic: any) => (
          <div key={epic.id}>{epic.name}</div>
        ))}
        {epics2.map((epic: any) => (
          <div key={epic.id}>{epic.name}</div>
        ))}
      </div>
    </div>
  )
}
