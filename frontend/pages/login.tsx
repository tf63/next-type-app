import { getProviders } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import LoginButton from '@/components/LoginButton'
import NavigateButton from '@/components/NavigateButton'
import SmallHeight from '@/components/SmallHeight'
import FlexContainer from '@/components/FlexContainer'

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
