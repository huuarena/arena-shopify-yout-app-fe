// @flow
import axios from 'axios';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3/';

export const callYoutubeApi = async (endpoint: string, method?: string = 'GET', data?: object) => {
    console.log('url :', YOUTUBE_API_BASE_URL + endpoint);

    try {
        const res = await axios({
            url: endpoint,
            method,
            data,
            headers: {},
            baseURL: YOUTUBE_API_BASE_URL,
        });

        return {
            success: true,
            payload: res.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error.message,
            },
        };
    }
};
