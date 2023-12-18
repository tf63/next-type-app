import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
    const { status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (status === 'unauthenticated' && router.pathname != '/login') router.push('/login')
    }, [router, status])
    if (status === 'loading') return <p>Loading...</p>
    if (status === 'authenticated') return children
}
