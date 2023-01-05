import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { SWRConfig } from 'swr' // useSWRを使用ているため

// apiから取得した情報をモックするために書き2つをimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import CommentPage from '../pages/comment-page' // 今回のテスト対象

const server = setupServer(
    rest.get(
        'https://jsonplaceholder.typicode.com/comments/?_limit=10', // このpathに対するモックを作成する
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        postId: 1,
                        id: 1,
                        name: 'A',
                        email: 'dummya@gmail.com',
                        body: 'test body 1',
                    },
                    {
                        postId: 2,
                        id: 2,
                        name: 'B',
                        email: 'dummyb@gmail.com',
                        body: 'test body b',
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

describe("comment page", () => {
    it("成功したとき", async () => {
        render(
            <SWRConfig value={{ dedupingInterval: 0 }}> {/*valueにはoptionを与える*/}
                <CommentPage />{/* useSWRなので、propsを受け取っているわけではない */}
            </SWRConfig>
        )
        expect(await screen.findByText('1: test body 1')).toBeInTheDocument() // テキストの一部でなく、完全一致にする。
        expect(await screen.findByText('2: test body b')).toBeInTheDocument()
    })

    it("失敗したとき", async () => {
        // 失敗させる : サーバーstatusの上書き
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/comments/?_limit=10', (
                req, res, ctx
            ) => {
                return res(ctx.status(400))
            })
        )

        render(
            <SWRConfig value={{ dedupingInterval: 0 }}>
                <CommentPage />
            </SWRConfig>
        )
        expect(await screen.findByText('error!')).toBeInTheDocument()


    })
})
