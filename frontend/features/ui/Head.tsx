import Head from 'next/head'

/**
 * 全ページ共通のHeadコンポーネント
 * @returns Head
 */
export const MyHead: React.FC = () => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/next.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>TypeApp</title>
        </Head>
    )
}
