import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  async loader() {
    const val = +new Date()
    console.log('\n\n')
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('Server loader', val)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('\n\n')
    await new Promise((res) => setTimeout(res, 1000))
    return {
      a: val,
    }
  },
  staleTime: 1000 * 10,
  gcTime: 1000 * 10,
})

function Home() {
  const data = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>Welcome Home!!! {data.a}</h3>
    </div>
  )
}
