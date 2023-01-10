import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { getAllTasksData } from '../lib/fetch'
import useSWR from 'swr'
import axios from 'axios'
import { TASK } from '../types/Types'

//GetStaticPropsで受け取る方を定義する
interface STATICPROPS {
    staticTasks: TASK[] // [{},{}...]
}

//useSWR用のfetcer関数を作る
const axiosFetcher = async () => {
    const result = await axios.get<TASK[]>(
        'https://jsonplaceholder.typicode.com/todos/?_limit=10'
    )
    return result.data
}

const TaskPage: React.FC<STATICPROPS> = ({ staticTasks }) => { // propsの方を定義
    const { data: tasks, error } = useSWR("todosFetch", axiosFetcher, {
        initialData: staticTasks,
        revalidateOnMount: true
    })

    if (error) return <span>Error!</span>

    return (
        <Layout title="Task">
            <p className="text-4xl mb-10">
                Task page
            </p>
            <ul>
                {tasks && tasks.map((task) => ( // => {} じゃないよ =>()だよ
                    <li key={task.id}>
                        {task.id}
                        {': '}
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
    const staticTasks = await getAllTasksData()
    return {
        props: { staticTasks } // オブジェクト
    }
}

/*
1つのページに、getStaticPropsとuseSWRを実装したときの挙動

サーバーサイドにて、ビルドしたらgetStaticPropsが実行され、apiデータを取得
  ┗ TaskPageのpropsに渡される。
    ┗ useSWRの初期値に、propsが設定され、静的なHTMLが生成される。
マウントされたら、ユーザー側でuseSWRが実行され、ビルド時のデータを上書きして表示する。
*/
