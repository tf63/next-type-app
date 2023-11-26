import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import { CustomNextPage } from '@/types/custom-next-page'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import UserIcon from '@/components/UserIcon'

const Home: CustomNextPage = () => {
    const { data, status } = useSession()
    return (
        <main>
            <Card>This is Home Page</Card>
            <LinkedButton href="/select" text="Select" color="blue" />
            <LinkedButton href="/profile" text="Profile" color="blue" />
            {data?.user?.name || <Link href="/auth/signin">SignIn</Link>}
            {status === 'authenticated' && (
                <button className="ml-5" onClick={() => signOut()}>
                    SignOut
                </button>
            )}
            <div>
                {status === 'authenticated' && (
                    <UserIcon url={data?.user?.image || ''} userName={data?.user?.name || ''} />
                )}
            </div>
        </main>
    )
}

export default Home
