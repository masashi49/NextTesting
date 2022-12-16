//記事詳細ページ
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch'
import { POST } from '../../types/Types'
import { GetStaticPaths, GetStaticProps } from 'next'

const PostDetail: React.FC<POST> = ({ id, title, body }) => {
    return (
        <Layout title={title}>
            <p className='m-4'>
                {id}
            </p>
            <p className='mb-4 text-xl font-bold'>{title}</p>
            <p className="mx-10 mb-12">{body}</p>
            <Link href="/blog-page">
                <div className='flex cursor-pointer mt-12'>
                    ＜＜ <a data-testid="back-blog">Back to blog-page</a>
                </div>
            </Link>
        </Layout>
    )
}

export default PostDetail

// SSGを書いていく↓
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const post = await getPostData(ctx.params.id as string)
    return {
        props: {
            ...post
        }
    }

}
