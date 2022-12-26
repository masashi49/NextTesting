import Layout from "../components/Layout"
import useSWR from "swr"
import axios from "axios"
import Comment from "../components/Comment"
import { COMMENT } from "../types/Types"

//fetcer関数を作る
const axiosFetcher = async () => {
    const result = await axios.get<COMMENT[]>('https://jsonplaceholder.typicode.com/comments/?_limit=10')
    return result.data
}

const CommentPage: React.FC = () => {
    const { data: comments, error } = useSWR('commentsFetch', axiosFetcher) // 第一引数:任意のkey名 , 第二引数実際の処理
    if (error) return <span>error!</span>

    return (
        <Layout title="Comment">
            <p className="text-4xl m-10">
                Comment page
            </p>
            <ul>
                {comments &&
                    comments.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))}
            </ul>
        </Layout>
    )
}
export default CommentPage

/*
useSWRのoptionについて理解する

fallbackData (旧)





*/
