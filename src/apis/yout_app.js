// @flow

import { callApi } from '../utils/apiCaller';

export const getYoutApp = async (): object => {
    return await callApi(`/admin/yout-app`);
};

export const updateYoutApp = async (field: string, data_stringify: string): object => {
    return await callApi(`/admin/yout-app`, 'POST', { field, data_stringify });
};
