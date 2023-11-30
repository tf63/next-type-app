import Card from '@/components/Card'
import SelectBoard from '@/components/SelectBoard'
import { Label, SelectBoardProps } from '@/types/types'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import NavigateButton from '@/components/NavigateButton'
import FlexContainer from '@/components/FlexContainer'

const Select: CustomNextPage = () => {
    const [category, setCategory] = useState<Label>({ id: 0, name: '' })
    const [size, setSize] = useState<Label>({ id: 0, name: '' })
    const [tag, setTag] = useState<Label>({ id: 0, name: '' })
    const [language, setLanguage] = useState<Label>({ id: 0, name: '' })

    const selectBoardProps: SelectBoardProps = {
        category: category,
        setCategory: setCategory,
        setSize: setSize,
        setLanguage: setLanguage,
        setTag: setTag
    }

    const state = { category: category, size: size, tag: tag, language: language }
    const router = useRouter()
    const navigateEvent = () => {
        router.push({
            pathname: '/game',
            query: { state: JSON.stringify(state) }
        })
    }

    return (
        <main style={{ height: '1300px' }}>
            <FlexContainer>
                <p style={{ marginBottom: '50px' }}>
                    <span>{`Language: ${language.name}, Size: ${size.name}`}</span>
                    {category.name !== 'language' && <span>{`, Tag: ${tag.name}`}</span>}
                </p>
            </FlexContainer>
            <FlexContainer>
                <Button onClick={navigateEvent} flex={true}>
                    Start
                </Button>
            </FlexContainer>
            <SmallHeight />
            <SelectBoard {...selectBoardProps} />
        </main>
    )
}

export default Select
