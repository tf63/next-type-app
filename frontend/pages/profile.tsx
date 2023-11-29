import Card from '@/components/Card'
import {
    ProfileLogAPIRequest,
    ProfileLogAPIResponse,
    ProfileSumAPIRequest,
    ProfileSumAPIResponse
} from '@/interfaces/interfaces'
import { CustomNextPage } from '@/types/custom-next-page'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SmallHeight from '@/components/SmallHeight'
import ProfileBoard from '@/components/ProfileBoard'
import FlexContainer from '@/components/FlexContainer'
import PageBar from '@/components/PageBar'
import { Label } from '@/types/types'
import { SelectGroup, SelectGroupMultiLine } from '@/components/SelectGroup'

const Profile: CustomNextPage = () => {
    const { data, status } = useSession()
    const [page, setPage] = useState(0)
    const [monthToSummary, setMonthToSummary] =
        useState<Map<string, { correct: number; miss: number; speed: number }>>()
    const [logs, setLogs] = useState<ProfileLogAPIResponse[]>([])
    const [month, setMonth] = useState<Label>({ id: 1, name: '' })
    const [monthLabels, setMonthLabels] = useState<Label[]>([])
    const PAGE_SIZE = 5

    const getDateStr = (dateUtc: string) => {
        const dateObject = new Date(dateUtc)
        const hour = dateObject.getHours().toString().padStart(2, '0')
        const minute = dateObject.getMinutes().toString().padStart(2, '0')
        const dateStr = `${dateObject.getMonth() + 1}/${dateObject.getDate()} ${hour}:${minute}`

        return dateStr
    }

    const getYearMonth = (dateUtc: string) => {
        const dateObject = new Date(dateUtc)
        const dateStr = `${dateObject.getFullYear()}/${dateObject.getMonth() + 1}`
        return dateStr
    }

    useEffect(() => {
        const fetchSum = async () => {
            const requestBody: ProfileSumAPIRequest = {
                userId: data?.user?.id!
            }
            const response = await axios.post('/api/profile/sum', requestBody)
            const responseData: ProfileSumAPIResponse[] = response.data

            const labels: Label[] = []
            const map = new Map<string, { correct: number; miss: number; speed: number }>()
            responseData.forEach((response, index) => {
                const { month, correct, miss, speed } = response
                const label = getYearMonth(month)
                map.set(label, { correct, miss, speed })
                labels.push({ id: index, name: label })
            })

            setMonth(labels[0])
            setMonthLabels(labels)
            setMonthToSummary(map)
        }

        fetchSum()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const requestBody: ProfileLogAPIRequest = {
                userId: data?.user?.id!,
                offset: page * PAGE_SIZE,
                num: PAGE_SIZE + 1
            }
            const response = await axios.post('/api/profile/log', requestBody)
            setLogs(response.data)
        }

        fetchData()
    }, [page])

    const getSpeed = (speed: number | undefined) => {
        if (speed != null) {
            return speed.toFixed(2)
        } else {
            return 0
        }
    }

    const getAccuracy = (correct: number | undefined, miss: number | undefined) => {
        if (correct != null && miss != null) {
            return ((correct / (correct + miss + 0.000001)) * 100).toFixed(2)
        } else {
            return 0
        }
    }

    return (
        <main style={{ height: '1300px' }}>
            <ProfileBoard data={data} status={status} />
            <SmallHeight />
            <p>Dashboard</p>
            <Card>
                <div style={{ marginBottom: '20px' }}>Your Results in</div>
                <SelectGroupMultiLine {...{ labels: monthLabels, setLabel: setMonth, mode: 'dent' }} />
                <FlexContainer position="left" align="top">
                    <div style={{ width: '50%' }}>
                        <div style={{ marginTop: '20px' }}>Total</div>
                        <p style={{ marginLeft: '20px' }}>correct: {monthToSummary?.get(month.name)?.correct!}</p>
                        <p style={{ marginLeft: '20px' }}>miss: {monthToSummary?.get(month.name)?.miss!} </p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <div style={{ marginTop: '20px' }}>mean</div>
                        <p style={{ marginLeft: '20px' }}>
                            accuracy:{' '}
                            {getAccuracy(
                                monthToSummary?.get(month.name)?.correct!,
                                monthToSummary?.get(month.name)?.miss!
                            )}
                        </p>
                        <p style={{ marginLeft: '20px' }}>speed: {getSpeed(monthToSummary?.get(month.name)?.speed!)}</p>
                    </div>
                </FlexContainer>
            </Card>
            <PageBar datas={logs} page={page} setPage={setPage} pageSize={PAGE_SIZE} />
            {logs.slice(0, PAGE_SIZE).map((log, index) => {
                return (
                    <Card key={index}>{`[${getDateStr(
                        log.created_at!
                    )}] correct: ${log.correct!} miss: ${log.miss!} speed: ${getSpeed(
                        log.speed!
                    )} accuracy: ${getAccuracy(log.correct!, log.miss!)}`}</Card>
                )
            })}
        </main>
    )
}

export default Profile
Profile.requireAuth = true
