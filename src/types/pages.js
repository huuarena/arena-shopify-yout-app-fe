// @flow
// Data
export type PagesData = {
    +data: Array<object>,
    +selected: number,
};

// App Data State
export type PagesState = {
    +pages: PagesData,
};

// App Data Action
export type PagesAction = { type: 'SWITCH_PAGES', +payload: number }; // | Another Action
