import Card from '@/components/Card'
import { ProfileMonthAPIRequest, ProfileSummaryAPIRequest } from '@/interfaces/interfaces'
import { CustomNextPage } from '@/types/custom-next-page'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SmallHeight from '@/components/SmallHeight'
import ProfileBoard from '@/components/ProfileBoard'
import { SelectGroupMultiLine } from '@/components/SelectGroup'
import KeyBoard from '@/components/KeyBoard'
import { getAccuracy, getSelectorName, getSpeed, getSummaryByMonth } from '@/lib/format'
import TypePrevSystem from '@/components/TypePrevSystem'
import { useProfileStore } from '@/states/Profile'
import HistoryBoard from '@/components/HistoryBoard'
import TwoColumn from '@/components/TwoColumn'

const Profile: CustomNextPage = () => {
    const { data } = useSession()

    const month = useProfileStore((state) => state.month)
    const setMonth = useProfileStore((state) => state.setMonth)
    const summarys = useProfileStore((state) => state.summarys)
    const setProfileSummary = useProfileStore((state) => state.setProfileSummary)
    const setProfileMonth = useProfileStore((state) => state.setProfileMonth)
    const opacityValues = useProfileStore((state) => state.opacityValues)

    useEffect(() => {
        const summaryRequestBody: ProfileSummaryAPIRequest = {
            userId: data?.user?.id!
        }
        const monthRequestBody: ProfileMonthAPIRequest = {
            userId: data?.user?.id!,
            offset: 0,
            num: 1
        }
        setProfileSummary(summaryRequestBody)
        setProfileMonth(monthRequestBody)
    }, [])

    return (
        <main style={{ minHeight: '1800px' }}>
            <Card>
                <ProfileBoard />
            </Card>
            <SmallHeight />
            <p>Dashboard</p>
            <Card>
                <div style={{ marginBottom: '20px' }}>Your Results in</div>
                <SelectGroupMultiLine {...{ labels: month.labels, setLabel: setMonth, mode: 'dent' }} />
                <TwoColumn>
                    <>
                        <div style={{ marginTop: '20px' }}>Total</div>
                        <p style={{ marginLeft: '20px' }}>
                            correct: {getSummaryByMonth(summarys, getSelectorName(month)).correct}
                        </p>
                        <p style={{ marginLeft: '20px' }}>
                            miss: {getSummaryByMonth(summarys, getSelectorName(month)).miss}
                        </p>
                    </>
                    <>
                        <div style={{ marginTop: '20px' }}>mean</div>
                        <p style={{ marginLeft: '20px' }}>
                            accuracy:{' '}
                            {getAccuracy(
                                getSummaryByMonth(summarys, getSelectorName(month)).correct,
                                getSummaryByMonth(summarys, getSelectorName(month)).miss
                            )}
                        </p>
                        <p style={{ marginLeft: '20px' }}>
                            speed: {getSpeed(getSummaryByMonth(summarys, getSelectorName(month)).speed)}
                        </p>
                    </>
                </TwoColumn>
            </Card>

            <SmallHeight />
            <p>Key Log</p>
            <TypePrevSystem>
                <KeyBoard list={opacityValues} />
            </TypePrevSystem>
            <HistoryBoard />
        </main>
    )
}

export default Profile
Profile.requireAuth = true
