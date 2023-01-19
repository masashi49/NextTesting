import Layout from '../components/Layout'
const Home: React.FC = () => {
  return (
    <Layout title="Home">
      <p className="text-4xl">Welcome to Nextjs</p>
      {process.env.NEXT_PUBLIC_FOO}
    </Layout>
  )
}
export default Home
