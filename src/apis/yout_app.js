// @flow

import { callApi } from '../utils/apiCaller';

export const getYoutApp = async (): object => {
    return await callApi(`/admin/yout-app`);
};

export const updateYoutApp = async (field: string, data_stringify: string): object => {
    const _data_stringigy = data_stringify.replaceAll("'", '');
    const _data_stringigy2 = _data_stringigy.replaceAll('--', '__');
    return await callApi(`/admin/yout-app`, 'POST', { field, data_stringify: _data_stringigy2 });
};
