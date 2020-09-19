// @flow

// Data
export type YoutAppData = {
    +store_name: string,
    +youtube_api: object,
    +widgets: Array<object>,
};

// App Data State
export type YoutAppState = {
    +yout_app: YoutAppData,
};

// App Data Action
export type YoutAppAction =
    | { type: 'CHANGE_YOUT_APP', +payload: object }
    | { type: 'CHANGE_YOUT_APP_YOUTUBE_API', +payload: object }
    | { type: 'CHANGE_YOUT_APP_WIDGETS', +payload: Array<object> }; // | Another Action
