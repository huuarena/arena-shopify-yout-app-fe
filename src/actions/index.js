// @flow
import * as AppDataAction from './app_data';
import * as AppSettingAction from './app_settings';
import * as PagesActions from './pages';
import * as WidgetsActions from './widgets';
import * as YoutubeChannelActions from './youtube_channel';
import * as YoutubeApiActions from './youtube_api';

const AppNotify = (notifyObject: Object): Object => {
    return {
        type: 'NOTIFICATION',
        notifyObject,
    };
};

const Actions = {
    ...AppDataAction,
    ...AppSettingAction,
    AppNotify,
    ...PagesActions,
    ...WidgetsActions,
    ...YoutubeChannelActions,
    ...YoutubeApiActions,
    //...AnotherAction,
};

export default Actions;
