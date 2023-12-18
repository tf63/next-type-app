import { getProviders } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { LoginButton, NavigateButton, SmallHeight, FlexContainer } from '@/features/ui'

const Login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <main>
            {providers &&
                Object.values(providers).map((provider) => {
                    return (
                        <div key={provider.id}>
                            <LoginButton provider={provider} />
                        </div>
                    )
                })}
            <SmallHeight />
            <FlexContainer>
                <p>⬇ ログインせずに動作確認できます</p>
            </FlexContainer>
            <NavigateButton href="/profile_sample">Sample Profile Page</NavigateButton>
        </main>
    )
}

export default Login

export const getServerSideProps = async () => {
    const providers = await getProviders()
    return {
        props: { providers }
    }
}
