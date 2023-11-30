import { ClientSafeProvider, signIn } from 'next-auth/react'
import Button from '@/components/Button'
import FlexContainer from './FlexContainer'
import GithubSvg from './GithubSvg'

const LoginButton: React.FC<{ provider: ClientSafeProvider }> = ({ provider }) => {
    return (
        <Button onClick={() => signIn(provider.id)} color="github">
            <FlexContainer position="center">
                <GithubSvg />
                <div>Login with GitHub</div>
            </FlexContainer>
        </Button>
    )
}

export default LoginButton
