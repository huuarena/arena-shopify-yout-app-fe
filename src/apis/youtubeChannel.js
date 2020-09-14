// @flow
import { callApi } from '../utils/apiCaller';
import { CONFIG } from '../config';

export const getYoutubeChannel = async (data: object): object => {
    return await callApi(
        `http://localhost:3002/admin/youtube-channel?store_name=${CONFIG.STORE_NAME}`,
    );
};

export const updateYoutubeChannel = async (data_stringfy: string): object => {
    return await callApi(`http://localhost:3002/admin/youtube-channel`, 'POST', {
        store_name: CONFIG.STORE_NAME,
        data_stringfy,
    });
};
