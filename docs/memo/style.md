**global style**
- グローバルスタイル(`styles/global.css`)は`pages/_app.tsx`を置くと反映される
- ~~変更を加えた場合，サーバーを再起動しないと反映されない~~ リロードすれば反映される
```
    import { AppProps } from 'next/app'
    import '../styles/global.css'

    export default function App({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />
    }

```

- GlobalStyles.tsxを_app.tsxで読み込む方法もある
```
    import { createGlobalStyle } from 'styled-components'

    const GlobalStyles = createGlobalStyle`
        /* Add your global CSS styles here */
        body {
            font-family: "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
            background-color: #efefef;
            color: #888888;
        }

        h1 {
            font-weight: lighter;
            letter-spacing: .2rem;
        }
    `

    export default GlobalStyles
```
```
    import { AppProps } from 'next/app'
    import '../styles/global.css'

    export default function App({ Component, pageProps }: AppProps) {
        return (
            <>
            <GlobalStyles />
            <Component {...pageProps} />
            </>
        )
    }
```

### 参考
- styled-components
https://tekrog.com/styled-components
