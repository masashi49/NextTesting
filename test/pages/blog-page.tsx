import Layout from '../components/Layout'
import { getAllPostsData } from '../lib/fetch'
import Post from '../components/Post'
import { GetStaticProps } from 'next'
import { POST } from '../types/Types'

interface STATICPROPS {
    posts: POST[]
}


const BlogPage: React.FC<STATICPROPS> = ({ posts }) => {
    return (
        <Layout title="Blog">
            <p className="text-4xl">
                blog page
            </p>
            <ul className='mt-10'>{posts && posts.map((post) => (<Post key={post.id} {...post} />))}</ul>
        </Layout>
    )
}
export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllPostsData()
    return {
        props: { posts },
    }
}
/*
1 : buildした時に、getStaticPropsが呼ばれ、getAllPostDataから投稿データを取ってくる。30行目
2 : 投稿データはBlogPageのpropsに渡され、そのデータをmapする。


getStaticProps : SSG
ビルド時、データとセットで行われるので、javascriptを無効化されていてもデータが出る。

useSWR : クライアントサイドのデータフェッチ
ユーザーのブラウザでjsが時効されるので、js無効だと動かない
 - ユーザーのアクセスのたびに最新のデータを取得したい時
 
*/
