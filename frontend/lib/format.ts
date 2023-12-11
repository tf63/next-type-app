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
