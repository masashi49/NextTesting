import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { SWRConfig } from 'swr' // useSWRを使用ているため
// apiから取得した情報をモックするために書き2つをimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import TaskPage from '../pages/task-page'
import { TASK } from '../types/Types'

const server = setupServer(
    rest.get(
        'https://jsonplaceholder.typicode.com/todos/?_limit=10', // このpathに対するモックを作成する
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        userId: 1,
                        id: 1,
                        title: 'Task a',
                        completed: true,
                    },
                    {
                        userId: 2,
                        id: 2,
                        title: 'Task b',
                        completed: false,
                    },
                ])
            )
        }
    )
)

// このテストファイルの一番最初に実行する
beforeAll(() => {
    server.listen() // サーバーを起動
})

// afterEachは各itのテストが終わるたびに実行
afterEach(() => {
    server.resetHandlers() // 各テスト同士が影響し合うのを防ぐ。
    cleanup()
})

// このファイルのテストが終了した時に実行
afterAll(() => {
    server.close()
})

describe('todo page / useSWR', () => { // getStaticPropsは使わずに、propsを渡すようにする
    //ダミープログラム
    let staticTasks: TASK[]

    staticTasks = [
        {
            userId: 3,
            id: 3,
            title: 'Task c',
            completed: true,
        }, {
            userId: 4,
            id: 4,
            title: 'Task d',
            completed: false,
        }
    ]

    it("csf data", async () => {
        render(
            <SWRConfig value={{ dedupingInterval: 0 }}>
                <TaskPage staticTasks={staticTasks} />
            </SWRConfig>)
        expect(await screen.findByText('Task c')).toBeInTheDocument()
        expect(screen.getByText('Task d')).toBeInTheDocument()
        //screen.debug() // 最初のレンダリングでは、propsに渡されたgetStaticPropsの評価がされている形。静的なデータ

        expect(await screen.findByText('Task a')).toBeInTheDocument() // 最初のexpectはawaitつける
        expect(screen.getByText('Task b')).toBeInTheDocument() // 最初のexpectはawaitつける
        //screen.debug()// 2回目のテストでは、swrでapi接続にて更新されたデータが入る。
    })

    it("csf data error", async () => {

        server.use(
            rest.get('https://jsonplaceholder.typicode.com/todos/?_limit=10', (
                req, res, ctx
            ) => {
                return res(ctx.status(400))
            })
        )
        render(
            <SWRConfig value={{ dedupingInterval: 0 }}>
                <TaskPage staticTasks={staticTasks} />
            </SWRConfig>)
        
        expect(await screen.findByText('Error!')).toBeInTheDocument()

    })
})
