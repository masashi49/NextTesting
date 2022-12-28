import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { SWRConfig } from 'swr' // useSWRを使用ているため

// apiから取得した情報をモックするために書き2つをimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import CommentPage from '../pages/comment-page' // 今回のテスト対象

const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/comments/?_limit=10',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        postId: 1,
                        id: 1,
                        name: '1name',
                        email: 'gmail.com',
                        body: 'body',
                    },
                    {
                        postId: 2,
                        id: 2,
                        name: '2name',
                        email: 'gmail.com',
                        body: 'body',
                    }
                ])
            )
        })
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
