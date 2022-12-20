/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester' // 初期設定を行うもの

// apiテスト用
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// クリック用のイベントを設置
import userEvent from '@testing-library/user-event'

initTestHelpers() // next-page-testerを使うために実行するおやくそく

// apiのレスポンスをモックする
const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/posts/?_limit=10',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        userId: 1,
                        id: 1,
                        title: 'bummy title 1',
                        body: 'bummuy body 1'
                    },
                    {
                        userId: 2,
                        id: 2,
                        title: 'bummy title 2',
                        body: 'bummuy body 2'
                    }
                ])
            )
        }), // カンマで繋げる
    rest.get('https://jsonplaceholder.typicode.com/posts/1',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    {
                        userId: 1,
                        id: 1,
                        title: 'bummy title 1',
                        body: 'bummuy body 1'
                    }
                )
            )
        }),
    rest.get('https://jsonplaceholder.typicode.com/posts/2',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    {
                        userId: 1,
                        id: 1,
                        title: 'bummy title 2',
                        body: 'bummuy body 2'
                    }
                )
            )
        }),
]


const server = setupServer(...handlers) // テスト時、テストサーバーを立てる準備

// このテストファイルの一番最初に実行する
beforeAll(() => {
    server.listen() // サーバーを起動
})

// afterEachは各itのテストが終わるたびに実行
afterEach(() => {
    server.resetHandlers() // 各テスト同士が影響し合うのを防ぐ。
    cleanup()
})

/*
各itのテストの前に実行する
beforeEach(()=>{
    hoge()
})
*/

// このファイルのテストが終了した時に実行
afterAll(() => {
    server.close()
})

describe('ブログの記事ページ', () => {
    it("idが1用にレンダーされるはず", async () => {
        // まずはblog-pageにアクセス(お約束コード)
        const { page } = await getPage(
            { route: "/posts/1", }
        )
        // blog-pageをレンダリングする(お約束コード)
        render(page)

        expect(await screen.getByText('bummy title 1')).toBeInTheDocument() // awaitでレンダリングを待つ。
        screen.debug()
    })
})
