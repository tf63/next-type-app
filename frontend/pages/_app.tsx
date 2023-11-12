import { AppProps } from 'next/app'
import '../styles/Global.css'
import styles from '../styles/Theme.module.css'
import { LinkedButton } from '@/components/LinkedButton'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/next.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>TypeApp</title>
            </Head>
            <div className={styles.page_container}>
                <LinkedButton href="/" text="Type App" color="none" />
                <Component {...pageProps} />
            </div>
        </>
    )
}
