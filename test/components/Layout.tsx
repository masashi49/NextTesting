import Head from "next/head"
import Link from "next/Link"

interface TITLE {
    title: string
}

const Layout: React.FC<TITLE> = ({ children, title = "Next.js" }) => {
    return (
        <div className="flex justify-center item-center flex-col min-h-screen font-mono">
            <Head>
                <title>{title}</title>
            </Head>
            ここにナビゲーションを入れていく
        </div>
    )
}
