// @flow
import type { Action } from '../types'
import type { WidgetsData } from '../types/widget'

export default (state: WidgetsData = [], action: Action): WidgetsData => {
    switch (action.type) {
        case 'CHANGE_WIDGETS':
            return {
                ...state,
                ...action.widgets,
            }
        case 'EDIT_WIDGET':
            return {
                ...state,
                selected: action.widget,
            }
        default:
            return state
    }
}
