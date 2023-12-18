import { ClientSafeProvider, signIn } from 'next-auth/react'
import { Button } from './Button'
import { GithubSvg, FlexContainer } from '@/features/ui'

/**
 * Githubでログインするボタン
 * @param param0 proivder OAuthのプロバイダ
 * @returns LoginButton
 */
export const LoginButton: React.FC<{ provider: ClientSafeProvider }> = ({ provider }) => {
    return (
        <Button onClick={() => signIn(provider.id)} color="github">
            <FlexContainer position="center">
                <GithubSvg />
                <div>Login with GitHub</div>
            </FlexContainer>
        </Button>
    )
}
