import { callYoutubeApi } from '../utils/youtubeApiCaller';

export const getYoutubeChannelInformation = async (data) => {
    return await callYoutubeApi(
        `search?key=${data.key}&channelId=${data.channelId}&part=${
            data.part ? data.part : 'snippet'
        }&fields=${data.fields ? data.fields : '*'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

export const getVideosByVideoIds = async (data) => {
    return await callYoutubeApi(
        `videos?key=${data.key}&id=${data.videoIds}&part=${
            data.part ? data.part : 'snippet'
        }&fields=${data.fields ? data.fields : '*'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

export const getCommentsByVideoIds = async (data) => {
    return await callYoutubeApi(
        `commentThreads?key=${data.key}&videoId=${data.videoId}&part=${
            data.part ? data.part : 'snippet'
        }&textFormat=${data.textFormat ? data.textFormat : 'html'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};
