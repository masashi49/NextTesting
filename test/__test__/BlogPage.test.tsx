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
        })
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

describe("Blog page", () => {
    it("getStatichPropsが作動し、blogpageにpropsで渡されたあと、正しくレンダリングされているか", async () => {

        // まずはblog-pageにアクセス(お約束コード)
        const { page } = await getPage(
            { route: "/blog-page", }
        )
        // blog-pageをレンダリングする(お約束コード)
        render(page)

        // スクリーンの中に、blog pageがドキュメントとして存在するか。
        expect(await screen.getByText('blog page')).toBeInTheDocument() // awaitでレンダリングを待つ。
        expect(screen.getByText("bummy title 1")).toBeInTheDocument() // 上でawaitしているのでawait 不要
        expect(screen.getByText("bummy title 2")).toBeInTheDocument()
    })
})
