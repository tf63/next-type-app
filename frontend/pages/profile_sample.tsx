import { CustomNextPage } from '@/types/custom-next-page'
import { SmallHeight, FlexContainer, PageBar, Button, TwoColumn, Card } from '@/features/ui'
import { KeyBoard } from '@/features/keyboard'
import { SelectGroupMultiLine } from '@/features/select'
import { getAccuracy, getSpeed } from '@/lib/format'
import { KEY_TO_IDX } from '@/lib/const'

const ProfileSample: CustomNextPage = () => {
    const month = {
        id: 0,
        labels: [
            { id: 0, name: '2023/12' },
            { id: 1, name: '2023/11' },
            { id: 2, name: '2023/10' },
            { id: 3, name: '2023/09' }
        ]
    }
    const setMonth = () => {}
    const PAGE_SIZE = 5
    const logs = [
        {
            category_id: 4,
            correct: 1,
            created_at: '2023-11-30T11:24:42.018+00:00',
            miss: 4,
            problem_id: 1,
            speed: 0.999999000001
        },
        {
            category_id: 4,
            correct: 1,
            created_at: '2023-11-30T11:24:42.018+00:00',
            miss: 4,
            problem_id: 1,
            speed: 0.999999000001
        },
        {
            category_id: 4,
            correct: 1,
            created_at: '2023-11-30T11:24:42.018+00:00',
            miss: 4,
            problem_id: 1,
            speed: 0.999999000001
        },
        {
            category_id: 4,
            correct: 1,
            created_at: '2023-11-30T11:24:42.018+00:00',
            miss: 4,
            problem_id: 1,
            speed: 0.999999000001
        },
        {
            category_id: 4,
            correct: 1,
            created_at: '2023-11-30T11:24:42.018+00:00',
            miss: 4,
            problem_id: 1,
            speed: 0.999999000001
        }
    ]

    return (
        <main style={{ minHeight: '1800px' }}>
            <Card>
                <FlexContainer position="left">
                    <div style={{ width: '50%' }}>
                        <FlexContainer position="left" align="top">
                            <div style={{ paddingLeft: '100px' }} />
                            <div style={{ marginLeft: '40px' }}>
                                <p>Profile</p>
                                <p>You are not authenticated</p>
                            </div>
                        </FlexContainer>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Button onClick={() => {}}>LogOut</Button>
                    </div>
                </FlexContainer>
            </Card>
            <SmallHeight />
            <p>Dashboard</p>
            <Card>
                <div style={{ marginBottom: '20px' }}>Your Results in</div>
                <SelectGroupMultiLine {...{ labels: month.labels, setLabel: setMonth, mode: 'dent' }} />
                <TwoColumn>
                    <>
                        <div style={{ marginTop: '20px' }}>Total</div>
                        <p style={{ marginLeft: '20px' }}>correct: 4188</p>
                        <p style={{ marginLeft: '20px' }}>miss: 1302</p>
                    </>
                    <>
                        <div style={{ marginTop: '20px' }}>mean</div>
                        <p style={{ marginLeft: '20px' }}>accuracy: 76.28</p>
                        <p style={{ marginLeft: '20px' }}>speed: 2.07</p>
                    </>
                </TwoColumn>
            </Card>

            <SmallHeight />
            <p>Key Log</p>
            <KeyBoard list={Array.from({ length: KEY_TO_IDX.size }, () => 0)} />
            <PageBar datas={logs} page={0} setPage={() => {}} pageSize={PAGE_SIZE} />
            {logs.slice(0, PAGE_SIZE).map((log, index) => {
                return (
                    <Card key={index}>{`[11/30 20:24] correct: ${log.correct!} miss: ${log.miss!} speed: ${getSpeed(
                        log.speed!
                    )} accuracy: ${getAccuracy(log.correct!, log.miss!)}`}</Card>
                )
            })}
        </main>
    )
}

export default ProfileSample
