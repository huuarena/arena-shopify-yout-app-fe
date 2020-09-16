// @flow
import { callApi } from '../utils/apiCaller';

export const getYoutubeComments = async (store_name: string): object => {
    return await callApi(`http://localhost:3002/admin/youtube-comments?store_name=${store_name}`);
};

export const updateYoutubeComments = async (store_name: string, data_stringfy: string): object => {
    return await callApi(
        `http://localhost:3002/admin/youtube-comments?store_name=${store_name}`,
        'POST',
        {
            data_stringfy,
        },
    );
};
