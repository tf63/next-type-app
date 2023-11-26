import { getProviders } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import Card from '@/components/Card'
import SignInButton from '@/components/LoginButton'

const SignIn = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <main>
                <Card>This is Login Page</Card>
                {providers &&
                    Object.values(providers).map((provider) => {
                        return (
                            <div key={provider.id}>
                                <SignInButton provider={provider} />
                            </div>
                        )
                    })}
            </main>
        </>
    )
}

export default SignIn

export const getServerSideProps = async () => {
    // ここで、認証の方法を取得しています
    // 今回は、GitHub による認証だけですが、複数の認証方法（Google・Twitterなど）を取得することが出来ます
    const providers = await getProviders()
    return {
        props: { providers }
    }
}
