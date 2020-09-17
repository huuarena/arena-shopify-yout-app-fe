// @flow
import { combineReducers } from 'redux';
import app_data from './app_data';
import app_settings from './app_settings';
import pages from './pages';
import widgets from './widgets';
import youtube_channel from './youtube_channel';
import youtube_api from './youtube_api';
import youtube_videos from './youtube_videos';
import video_play from './video_play';
import youtube_comments from './youtube_comments';
import app_mode from './app_mode';

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
    youtube_videos,
    video_play,
    youtube_comments,
    app_mode,
    //another_state_prop,
});
