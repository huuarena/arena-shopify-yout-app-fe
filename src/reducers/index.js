// @flow
import { combineReducers } from 'redux';
import app_data from './app_data';
import app_settings from './app_settings';
import pages from './pages';
import widgets from './widgets';
import youtube_channel from './youtube_channel';
import youtube_api from './youtube_api';

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
    widgets,
    youtube_channel,
    youtube_api,
    //another_state_prop,
});
