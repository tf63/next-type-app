import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ProfileLogAPIRequest } from '@/interfaces/interfaces'
import { getAccuracy, getDateStr, getSpeed } from '@/lib/format'
import { Card, PageBar } from '@/features/ui'
import { useProfileStore } from '@/states/Profile'

/**
 * @returns
 */
export const HistoryBoard: React.FC = () => {
    const { data } = useSession()

    const PAGE_SIZE = 5
    const logs = useProfileStore((state) => state.logs)
    const page = useProfileStore((state) => state.page)
    const setProfileLog = useProfileStore((state) => state.setProfileLog)
    const updatePage = useProfileStore((state) => state.updatePage)

    const setPage = (page: number) => {
        const requestBody: ProfileLogAPIRequest = {
            userId: data?.user?.id!,
            offset: page * PAGE_SIZE,
            num: PAGE_SIZE + 1
        }
        setProfileLog(requestBody)
        updatePage(page)
    }

    useEffect(() => {
        setPage(page)
    }, [])
    return (
        <>
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
        </>
    )
}
