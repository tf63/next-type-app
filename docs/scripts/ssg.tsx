import { NextPage } from 'next'
import Head from 'next/head'

type SSGProps = {}

const SSG: NextPage<SSGProps> = () => {
    return (
        <div>
            {/* HeadはHeadタグに配置される */}
            <Head>
                <title>Static Site Generation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>SGGのページ</p>
            </main>
        </div>
    )
}

// ページコンポーネントはexport defaultする
export default SSG
