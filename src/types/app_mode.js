// @flow

import app_mode from '../reducers/app_mode';

// Data
export type AppModeData = {
    data: Array<object>,
    selected: string,
};

// App Data State
export type AppModeState = {
    +app_mode: AppModeData,
};

// App Data Action
export type AppModeAction = { type: 'CHANGE_APP_MODE', +payload: number }; // | Another Action
