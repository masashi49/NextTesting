import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'

// ページに到達した時の挙動をテスト
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

// apiから取得した情報をモックするために書き2つをimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'

initTestHelpers() // お決まり

// どのアクセスを引っ掛けるか
const server = setupServer(
    rest.get(
        'https://jsonplaceholder.typicode.com/todos/?_limit=10', // このpathに対するモックを作成する
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        userId: 3,
                        id: 3,
                        title: 'static task a',
                        completed: true,
                    },
                    {
                        userId: 4,
                        id: 4,
                        title: 'static task b',
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

// getStatickPropsのテストはこれだけでOK
describe('todo page getStaticProps', () => {
    it("todo task ", async () => {
        const { page } = await getPage(
            { route: "/task-page", }
        )
        render(page)
        expect(await screen.findByText('Task page')).toBeInTheDocument() // 非同期だから findByを使う
        expect(await screen.getByText('static task a')).toBeInTheDocument() // 非同期だから findByを使う
        expect(await screen.getByText('static task b')).toBeInTheDocument() // 非同期だから findByを使う
    })
})
