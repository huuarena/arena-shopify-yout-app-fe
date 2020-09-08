// @flow
import * as AppDataAction from './app_data';
import * as AppSettingAction from './app_settings';
import * as PageTabsActions from './page_tabs';
import * as WidgetsActions from './widgets';
import * as TemplatesActions from './templates';

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
    ...PageTabsActions,
    ...WidgetsActions,
    ...TemplatesActions,
    //...AnotherAction,
};

export default Actions;
