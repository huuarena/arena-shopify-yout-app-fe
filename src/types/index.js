// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import type { AppState, AppDataAction } from './app_data';
import type { AppSettingState, AppSettingAction } from './app_settings';
import type { PagesState, PagesAction } from './pages';
import type { VideoPlayState, VideoPlayAction } from './video_play';
import type { YoutAppState, YoutAppAction } from './yout_app';
import type { AppModeState, AppModeAction } from './app_mode';

export type ReduxInitAction = { type: '@@INIT' };

// APP STATE TYPE
export type State = AppState &
    AppSettingState &
    PagesState &
    VideoPlayState &
    AppModeState &
    YoutAppState; // & AnotherStateData

// APP ACTION TYPE
export type Action =
    | AppDataAction
    | AppSettingAction
    | PagesAction
    | VideoPlayAction
    | AppModeAction
    | YoutAppAction; // | AnotherAction

// APP STORE
export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;

export type GetState = () => State;

// APP THUNK ACTION TYPE
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
