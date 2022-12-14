/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import 'setimmediate'

initTestHelpers()


describe('Layoutのページリンクが正しく動くか', () => {
    it('Should route to selected page in navbar', async () => { // asyncする
        const { page } = await getPage({
            route: '/index', // indexページに到達
        })
        render(page) // renderする

        userEvent.click(screen.getByTestId('blog-nav'))
        expect(await screen.findByText('blog page')).toBeInTheDocument()
        //screen.debug() // 20行目のクリックにて、正しくblogページへ飛んでいるのを確認できた。

        userEvent.click(screen.getByTestId('comment-nav'))// コメントへのリンククリック
        expect(await screen.findByText('Comment page')).toBeInTheDocument() // テキストの発見

        userEvent.click(screen.getByTestId('context-nav'))
        expect(await screen.findByText('Context page')).toBeInTheDocument()

        userEvent.click(screen.getByTestId('task-nav'))
        expect(await screen.findByText('Task page')).toBeInTheDocument()

        userEvent.click(screen.getByTestId('home-nav'))
        expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument()
    })
})
