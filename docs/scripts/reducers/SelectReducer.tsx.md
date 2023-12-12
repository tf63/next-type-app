import { SelectState, Action } from '@/contexts/SelectContext'

export const selectReducer = (state: SelectState, action: Action): SelectState => {
    switch (action.type) {
        case 'INIT_STATE':
            return {
                ...state,
                ...action.data
            }
        case 'UPDATE_STATE':
            return {
                ...state,
                ...action.data
            }
    }
}
