import Button from '@/components/Button'
import Card from '@/components/Card'
import { ProfileLogAPIRequest, ProfileLogAPIResponse } from '@/interfaces/interfaces'
import { CustomNextPage } from '@/types/custom-next-page'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import styles from '../styles/Icon.module.css'
import theme from '../styles/Theme.module.css'
import FlexContainer from '@/components/FlexContainer'

const Profile: CustomNextPage = () => {
    const { data, status } = useSession()
    const [logs, setLogs] = useState<ProfileLogAPIResponse[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const requestBody: ProfileLogAPIRequest = { userId: data?.user?.id! }
            const response = await axios.post('/api/profile/log', requestBody)
            setLogs(response.data)
        }

        fetchData()
    }, [])

    return (
        <main>
            <Card>This is Profile Page</Card>
            <Card>
                <FlexContainer position="left">
                    Your Name: {data?.user?.name!} <img className={styles.icon} src={data?.user?.image!} />
                </FlexContainer>
            </Card>

            {status === 'authenticated' && <Button onClick={() => signOut()}>LogOut</Button>}

            {logs.map((log, index) => {
                const dateObject = new Date(log.created_at!)
                const dateStr = `${dateObject.getMonth()}/${dateObject.getDay()} ${dateObject.getHours()}:${dateObject.getMinutes()}`
                return (
                    <Card
                        key={index}
                    >{`[${dateStr}] correct: ${log.correct!} miss: ${log.miss!} speed: ${log.speed!}`}</Card>
                )
            })}
        </main>
    )
}

export default Profile
Profile.requireAuth = true
