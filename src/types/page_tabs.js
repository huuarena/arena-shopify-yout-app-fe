// @flow

// Data
export type PageTabsData = {
    +tabs: Array<object>,
    +current_page: string,
}

// App Data State
export type PageTabsState = {
    +page_tabs: AppData,
}

// App Data Action
export type PageTabsAction = { type: 'SWITCH_PAGES', +page: number } // | Another Action
