// @flow
import * as AppDataAction from './app_data';
import * as AppSettingAction from './app_settings';
import * as PagesActions from './pages';
import * as YoutAppActions from './yout_app';
import * as VideoPlayActions from './video_play';
import * as AppModeActions from './app_mode';

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
    ...VideoPlayActions,
    ...YoutAppActions,
    ...AppModeActions,
    //...AnotherAction,
};

export default Actions;
