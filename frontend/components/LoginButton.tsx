import { ClientSafeProvider, signIn } from 'next-auth/react'
import Button from '@/components/Button'
import theme from '../styles/Theme.module.css'
import styles from '../styles/Icon.module.css'
import GithubIcon from './GithubIcon'

const LoginButton: React.FC<{ provider: ClientSafeProvider }> = ({ provider }) => {
    return (
        <Button onClick={() => signIn(provider.id)} color="github">
            <div className={theme.center_container}>
                <div>
                    <GithubIcon />
                </div>
                <div>Login with GitHub</div>
            </div>
        </Button>
    )
}

export default LoginButton
