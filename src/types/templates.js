// @flow

// Data
export type TemplatesData = {
    +templates: Array<object>,
};

// App Data State
export type TemplatesState = {
    +templates_data: TemplatesData,
};

// App Data Action
export type TemplatesAction = { type: 'CHANGE_TEMPLATES', +templates: object }; // | Another Action
