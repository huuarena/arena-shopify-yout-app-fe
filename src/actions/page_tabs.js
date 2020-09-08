// @flow
import type { PageTabsAction } from '../types/page_tabs'

export const switchPagesAction = (page: number): PageTabsAction => {
    return {
        type: 'SWITCH_PAGES',
        page,
    }
}
