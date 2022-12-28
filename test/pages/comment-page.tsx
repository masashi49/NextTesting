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
fallbackData (旧 initialData) : フォールバックデータ 
 データを取得できるまでに時間がかかるので、その間の初期値を設置するための値
 getStickPropsの初期値として与えられることが多い。

revalidateOnMount : リバリデートオンマウント
 マウントされた時に自動的にサーバーサイドからデータをとってくるか。
 fallbackDataを設定しないときはデフォルトでonになる。
 fallbackDataを設定しているときは、明示的にonを各必要がある。

 refreshInterval : リフレッシュインターバル
 定期的にデータを更新する。毎秒の株価更新などリアルタイム情報に適している。デフォルトは0ms
 バックエンド側に負荷がかかる。

 dedupingInterval : ディデューピングインターバル
 デフォルトは2000ms
 連続でアクセスがあった場合、DBに過剰にアクセスしてしまう。
 2秒間に複数のリクエストがあった場合、最初のリクエストのみ受け付ける。(連打防止)
useSWRに保存されているキャッシュをより活用したい場合はこの値を増やす。
テストするときは値を0にすることが推奨
*/
