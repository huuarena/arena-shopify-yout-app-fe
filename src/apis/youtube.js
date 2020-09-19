// @flow

import { callYoutubeApi } from '../utils/youtubeApiCaller';

// https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&id=UCh_zF2FsiCflCPgYDudtcqg&part=snippet,brandingSettings&field=*
export const getYoutubeChannel = async (data: object): object => {
    return await callYoutubeApi(
        `channels?key=${data.key}&id=${data.id}&part=${data.part ? data.part : 'snippet,brandingSettings'}&fields=${data.fields ? data.fields : '*'}`,
    );
};

// https://www.googleapis.com/youtube/v3/search?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&channelId=UCh_zF2FsiCflCPgYDudtcqg&part=snippet&fields=*&maxResults=20
export const getYoutubeChannelVideos = async (data: object): object => {
    return await callYoutubeApi(
        `search?key=${data.key}&channelId=${data.channelId}&part=${data.part ? data.part : 'snippet'}&fields=${data.fields ? data.fields : '*'}&maxResults=${data.maxResults ? data.maxResults : '20'}${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&id=b8K539jjb4g&part=snippet,contentDetails,statistics&fields=*&maxResults=20
export const getYoutubeVideos = async (data: object): object => {
    return await callYoutubeApi(
        `videos?key=${data.key}&id=${data.ids}&part=${data.part ? data.part : 'snippet,contentDetails,statistics'}&fields=${data.fields ? data.fields : '*'}&maxResults=${data.maxResults ? data.maxResults : '20'}${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

// https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&videoId=b8K539jjb4g&part=snippet&textFormat=html&maxResults=20
export const getComments = async (data: object): object => {
    return await callYoutubeApi(
        `commentThreads?key=${data.key}&videoId=${data.videoId}&part=${data.part ? data.part : 'snippet'}&textFormat=${data.textFormat ? data.textFormat : 'html'}&maxResults=${data.maxResults ? data.maxResults : '10'}${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};
