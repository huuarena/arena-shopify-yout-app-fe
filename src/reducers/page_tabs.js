// @flow
import type { Action } from '../types'
import type { PageTabsData } from '../types/page_tabs'

export default (state: PageTabsData = {}, action: Action): PageTabsData => {
    switch (action.type) {
        case 'SWITCH_PAGES':
            return {
                ...state,
                current_page: action.page,
            }
        default:
            return state
    }
}
