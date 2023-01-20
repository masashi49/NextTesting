import Layout from '../components/Layout'
import { useCounter } from '../lib/hooks/useCounter'

const Home: React.FC = () => {
  const { count, increment, decrement } = useCounter(0)

  return (
    <Layout title="Home">
      <p className="text-4xl">Welcome to Nextjs</p>
      {process.env.NEXT_PUBLIC_FOO}

      <div>
        {count}
        <button onClick={increment} className="border-2">増える</button>
        <button onClick={decrement} className="border-2">へる</button>
      </div>
    </Layout>
  )
}
export default Home
