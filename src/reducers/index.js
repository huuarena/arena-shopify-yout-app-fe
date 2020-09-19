// @flow
import { combineReducers } from 'redux';
import app_data from './app_data';
import app_settings from './app_settings';
import pages from './pages';
import video_play from './video_play';
import yout_app from './yout_app';
import app_mode from './app_mode';
import widget_selected from './widget_selected';

// Notification Reducer
const notification = (
    state: Object = { content: '', error: false, show: false },
    action: Object,
): Object => {
    switch (action.type) {
        case 'NOTIFICATION':
            return { ...action.notifyObject };
        default:
            return state;
    }
};

export default combineReducers({
    app_data,
    app_settings,
    notification,
    pages,
    video_play,
    yout_app,
    app_mode,
    widget_selected,
    //another_state_prop,
});
