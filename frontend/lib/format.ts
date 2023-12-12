import { ProfileSummary, Selector } from '@/types/types'
import { IDX_TO_KEY, KEY_TO_IDX } from './const'

/**
 *
 * @param list opacitysに変換したいリスト
 * @param min opacityの最小値
 * @returns　opacitys (透明度)
 */
export const getOpacitys = (list: number[], min: number) => {
    // 最大値を取得
    const maxValue = Math.max(...list)

    // opacitysを計算
    const opacitys = list.map((value) => {
        if (maxValue > 0.0001) {
            // opacitysを計算
            const opacity = min + (125 * value) / maxValue
            // 100%を最大値とし， 整数に変換して返す
            return `${Math.min(opacity, 100).toFixed(0)}%`
        } else {
            // list内の全ての要素が0だったら初期値を設定する
            return `${min}%`
        }
    })

    return opacitys
}

/**
 * opacitysをキー配列に分割する
 * @param opacitys
 * @returns [opacityListsUnshift, opacityListsShift]
 */
export const decomposeOpacitys = (opacitys: string[]) => {
    const opacityListsUnshift = [
        opacitys.slice(0, 13),
        opacitys.slice(13, 25),
        opacitys.slice(25, 37),
        opacitys.slice(37, 48).concat([opacitys[opacitys.length - 1]])
    ]

    const opacityListsShift = [
        opacitys.slice(48, 61),
        opacitys.slice(61, 73),
        opacitys.slice(73, 85),
        opacitys.slice(85, 97)
    ]

    return [opacityListsUnshift, opacityListsShift]
}

/**
 * keyIdxからキーを取得する
 * 存在しないキーの場合はunknownを返す
 * @param idx keyIdx
 * @returns キー or 'unknown'
 */
export const getKey = (idx: number) => {
    const key = IDX_TO_KEY.get(idx)
    if (idx != null) {
        return key
    } else {
        return 'unknown'
    }
}

/**
 * キー入力を変換する
 * @param key キー入力
 * @param pressShift シフトキーが押されているかどうか event.shiftKey
 * @returns 変換されたキー
 */
export const wrapKey = (key: string, pressShift: boolean) => {
    if (pressShift) {
        switch (key) {
            case '0':
                return 's0'
            default:
                return key
        }
    } else {
        return key
    }
}

/**
 *
 * @param speed
 * @returns 小数点以下第二位にする
 */
export const getSpeed = (speed: number) => {
    return speed.toFixed(2)
}

/**
 *
 * @param correct 正解数
 * @param miss 不正解数
 * @returns 精度を小数点以下第二位で返す
 */
export const getAccuracy = (correct: number, miss: number) => {
    return ((correct / (correct + miss + 0.000001)) * 100).toFixed(2)
}

export const getMissPrevPerType = (correctTypes: number[], missPrevTypes: number[]) => {
    const missPrevPerType: number[] = []
    for (let i = 0; i < KEY_TO_IDX.size; i++) {
        for (let j = 0; j < KEY_TO_IDX.size; j++) {
            if (correctTypes[i] === 0) {
                missPrevPerType.push(0)
            } else {
                // キー1つに対するミスタイプの回数を少数第二位まで
                const value = Math.ceil((100 * missPrevTypes[i * KEY_TO_IDX.size + j]) / correctTypes[i])
                missPrevPerType.push(value)
            }
        }
    }

    return missPrevPerType
}

/**
 *
 * @param dateUtc UTC形式のdate
 * @returns 01/01 00:00という形式で返す
 */
export const getDateStr = (dateUtc: string) => {
    const dateObject = new Date(dateUtc)
    const hour = dateObject.getHours().toString().padStart(2, '0')
    const minute = dateObject.getMinutes().toString().padStart(2, '0')
    const dateStr = `${dateObject.getMonth() + 1}/${dateObject.getDate()} ${hour}:${minute}`

    return dateStr
}

/**
 *
 * @param dateUtc UTC形式のdate
 * @returns 2000/01という形式で返す
 */
export const getYearMonth = (dateUtc: string) => {
    const dateObject = new Date(dateUtc)
    const dateStr = `${dateObject.getFullYear()}/${dateObject.getMonth() + 1}`
    return dateStr
}

export const getMissPerType = (correctTypes: number[], missTypes: number[]) => {
    const missPerType: number[] = []
    for (let i = 0; i < KEY_TO_IDX.size; i++) {
        if (correctTypes[i] === 0) {
            missPerType.push(0)
        } else {
            // キー1つに対するミスタイプの回数を少数第二位まで
            const value = Math.ceil((100 * missTypes[i]) / correctTypes[i])
            missPerType.push(value)
        }
    }

    return missPerType
}

/**
 * セレクタから現在アクティブになっている要素のnameを取得する
 * @param selector セレクタ
 * @returns アクティブになっている要素のname
 */
export const getSelectorName = (selector: Selector) => {
    for (const label of selector.labels) {
        if (label.id === selector.id) {
            return label.name
        }
    }

    return ''
}

export const getSummaryByMonth = (summarys: ProfileSummary[], month: string) => {
    for (const summary of summarys) {
        if (month === summary.month) {
            return summary
        }
    }

    return { month: '', correct: 0, miss: 0, speed: 0 }
}
