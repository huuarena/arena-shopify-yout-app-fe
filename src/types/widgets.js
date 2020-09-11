// @flow

// Data
export type WidgetsData = {
    +data: Array<object>,
    +selected: object,
};

// App Data State
export type WidgetsState = {
    +widgets: WidgetsData,
};

// App Data Action
export type WidgetsAction = { type: 'CHANGE_WIDGETS', +payload: object }; // | Another Action
