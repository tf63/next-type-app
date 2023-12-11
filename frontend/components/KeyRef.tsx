import React, { useEffect, useRef } from 'react'

/**
 * キー入力の参照を割り当てる
 * onKeyDownを指定したコンポーネントの内側に指定する
 * @param param0 children
 * @returns
 */
const KeyRef: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current != null) {
            divRef.current.focus()
        }
    }, [])

    return (
        <div style={{ outline: 'none' }} tabIndex={0} ref={divRef}>
            {children}
        </div>
    )
}

export default KeyRef
