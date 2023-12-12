import Card from '@/components/Card'
import {
    ProfileLogAPIRequest,
    ProfileLogAPIResponse,
    ProfileMonthAPIRequest,
    ProfileMonthAPIResponse,
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
import { SelectGroupMultiLine } from '@/components/SelectGroup'
import KeyBoard from '@/components/KeyBoard'
import { KEY_TO_IDX } from '@/lib/const'
import { getAccuracy, getDateStr, getSpeed, getYearMonth } from '@/lib/format'
import TypePrevSystem from '@/components/TypePrevSystem'

const Profile: CustomNextPage = () => {
    const { data } = useSession()

    const [page, setPage] = useState(0)
    const [monthToSummary, setMonthToSummary] =
        useState<Map<string, { correct: number; miss: number; speed: number }>>()
    const [logs, setLogs] = useState<ProfileLogAPIResponse[]>([])
    const [month, setMonth] = useState<Label>({ id: 1, name: '' })
    const [monthLabels, setMonthLabels] = useState<Label[]>([])
    const PAGE_SIZE = 5

    const [missPrevPerTypes, setMissPrevPerTypes] = useState([
        Array.from({ length: KEY_TO_IDX.size * KEY_TO_IDX.size }, () => 0)
    ])

    useEffect(() => {
        const fetchSum = async () => {
            try {
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
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        const fetchLog = async () => {
            try {
                const requestBody: ProfileMonthAPIRequest = {
                    userId: data?.user?.id!,
                    offset: 0,
                    num: 1
                }
                const response = await axios.post('/api/profile/month/', requestBody)
                const responseData: ProfileMonthAPIResponse[] = response.data
                if (responseData.length > 0) {
                    const datas = responseData.map((data, index) => data.miss_prev_per_type)
                    setMissPrevPerTypes(datas)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchSum()
        fetchLog()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestBody: ProfileLogAPIRequest = {
                    userId: data?.user?.id!,
                    offset: page * PAGE_SIZE,
                    num: PAGE_SIZE + 1
                }

                const response = await axios.post('/api/profile/log', requestBody)
                setLogs(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [page])

    const [opacitys, setOpacitys] = useState(Array.from({ length: KEY_TO_IDX.size }, () => 0))

    return (
        <main style={{ minHeight: '1800px' }}>
            <Card>
                <ProfileBoard />
            </Card>
            <SmallHeight />
            <p>Dashboard</p>
            <Card>
                <div style={{ marginBottom: '20px' }}>Your Results in</div>
                <SelectGroupMultiLine {...{ labels: monthLabels, setLabel: setMonth, mode: 'dent' }} />
                <FlexContainer position="left" align="top">
                    <div style={{ width: '50%' }}>
                        <div style={{ marginTop: '20px' }}>Total</div>
                        <p style={{ marginLeft: '20px' }}>
                            correct: {monthToSummary != null && monthToSummary?.get(month.name)?.correct!}
                        </p>
                        <p style={{ marginLeft: '20px' }}>
                            miss: {monthToSummary != null && monthToSummary?.get(month.name)?.miss!}{' '}
                        </p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <div style={{ marginTop: '20px' }}>mean</div>
                        <p style={{ marginLeft: '20px' }}>
                            accuracy:{' '}
                            {monthToSummary != null &&
                                getAccuracy(
                                    monthToSummary?.get(month.name)?.correct!,
                                    monthToSummary?.get(month.name)?.miss!
                                )}
                        </p>
                        <p style={{ marginLeft: '20px' }}>
                            speed: {monthToSummary != null && getSpeed(monthToSummary?.get(month.name)?.speed!)}
                        </p>
                    </div>
                </FlexContainer>
            </Card>

            <SmallHeight />
            <p>Key Log</p>
            <TypePrevSystem missPrevPerTypes={missPrevPerTypes} setOpacitys={setOpacitys}>
                <KeyBoard list={opacitys} />
            </TypePrevSystem>

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
