// @flow
import { combineReducers } from 'redux';
import app_data from './app_data';
import app_settings from './app_settings';
import page_tabs from './page_tabs';
import widgets from './widgets';
import templates from './templates';

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
    page_tabs,
    widgets,
    templates,
    //another_state_prop,
});
