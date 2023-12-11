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
import { useEffect, useRef, useState } from 'react'
import SmallHeight from '@/components/SmallHeight'
import ProfileBoard from '@/components/ProfileBoard'
import FlexContainer from '@/components/FlexContainer'
import PageBar from '@/components/PageBar'
import { Label } from '@/types/types'
import { SelectGroupMultiLine } from '@/components/SelectGroup'
import KeyBoard from '@/components/KeyBoard'
import { KEY_TO_IDX } from '@/lib/const'

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

    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current != null) {
            divRef.current.focus()
        }
    }, [])

    const [opacitys, setOpacitys] = useState(Array.from({ length: KEY_TO_IDX.size }, () => 0))
    const handleKeyDown = (event: React.KeyboardEvent) => {
        let key = event.key
        // ブラウザの動作があるキーを無効化する
        if (key === 'Tab' || key === ' ') {
            event.preventDefault()
            console.log('prevent default')
        }

        // 一部のキーはエスケープする
        if (key === 'Shift' || key === 'Control' || key === 'CapsLock' || key === 'Meta' || key === 'Alt') {
            console.log('disable key')
            return false
        }

        // mapper
        if (key === '0' && event.shiftKey) {
            key = 's0'
        }

        const idx = KEY_TO_IDX.get(key)
        if (idx != null) {
            const op = missPrevPerTypes[0].slice(idx * KEY_TO_IDX.size, (idx + 1) * KEY_TO_IDX.size)
            console.log('op', op)
            setOpacitys(op)
            console.log('key: ', key, 'idx: ', idx)
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent) => {
        setOpacitys(Array.from({ length: KEY_TO_IDX.size }, () => 0))
    }

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
                        <p style={{ marginLeft: '20px' }}>speed: {getSpeed(monthToSummary?.get(month.name)?.speed!)}</p>
                    </div>
                </FlexContainer>
            </Card>

            <SmallHeight />
            <p>Key Log</p>
            <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={divRef}>
                <KeyBoard list={opacitys} />
            </div>

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
