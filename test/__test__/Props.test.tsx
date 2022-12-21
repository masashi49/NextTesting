import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Post from '../components/Post'
import { POST } from '../types/Types'

describe('ポストコンポーネントにpropsを与える', () => {
    //まずはpropsを作成する
    let dummuyProps: POST

    // itのたびに実行するbeforeEach
    beforeEach(() => {
        dummuyProps = {
            userId: 1,
            id: 1,
            title: "dummuy title 1",
            body: "dummuy body 1"
        }
    })
    it("propsを与えてレンダリングする", () => {
        render(<Post {...dummuyProps} />) // POSTの型通りに値を渡す
        expect(screen.getByText(dummuyProps.id)).toBeInTheDocument()
        expect(screen.getByText(dummuyProps.title)).toBeInTheDocument()
    })
})
