// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import type { AppState, AppDataAction } from './app_data';
import type { AppSettingState, AppSettingAction } from './app_settings';
import type { PagesState, PagesAction } from './pages';
import type { WidgetsState, WidgetsAction } from './widgets';
import type { TemplatesState, TemplatesAction } from './templates';
import type { YoutubeChannelState, YoutubeChannelAction } from './youtube_channel';
import type { YoutubeApiState, YoutubeApiAction } from './youtube_api';
import type { VideosState, VideosAction } from './videos';

export type ReduxInitAction = { type: '@@INIT' };

// APP STATE TYPE
export type State = AppState &
    AppSettingState &
    PagesState &
    WidgetsState &
    TemplatesState &
    YoutubeApiState &
    VideosState &
    YoutubeChannelState; // & AnotherStateData

// APP ACTION TYPE
export type Action =
    | AppDataAction
    | AppSettingAction
    | PagesAction
    | WidgetsAction
    | TemplatesAction
    | YoutubeApiAction
    | VideosAction
    | YoutubeChannelAction; // | AnotherAction

// APP STORE
export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;

export type GetState = () => State;

// APP THUNK ACTION TYPE
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
