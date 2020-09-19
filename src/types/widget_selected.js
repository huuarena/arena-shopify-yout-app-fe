// @flow

// Data
export type WidgetSelectedData = {};

// App Data State
export type WidgetSelectedState = {
    +widget_selected: WidgetSelectedData,
};

// App Data Action
export type WidgetSelectedAction = { type: 'CHANGE_WIDGET_SELECTED', +payload: object }; // | Another Action
