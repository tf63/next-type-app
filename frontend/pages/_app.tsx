import { AppProps } from 'next/app'
import '../styles/Global.css'
import { NextComponentType } from 'next'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import MyHead from '@/components/Head'
import Layout from '@/components/Layout'
import AuthGuard from '@/components/AuthGuard'

export type CustomAppProps = AppProps<{ session: Session }> & {
    Component: NextComponentType & { requireAuth?: boolean }
}

export default function App({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
    return (
        <>
            <SessionProvider>
                <MyHead />
                <Layout>
                    {Component.requireAuth ? (
                        <AuthGuard>
                            <Component {...pageProps} />
                        </AuthGuard>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </Layout>
            </SessionProvider>
        </>
    )
}
