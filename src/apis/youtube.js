import { callYoutubeApi } from '../utils/youtubeApiCaller';

export const getYoutubeChannelData = async (data) => {
    return await callYoutubeApi(
        `search?key=${data.youtubeApiKey}&channelId=${data.channelId}&part=${
            data.part ? data.part : 'snippet'
        }&fields=${data.fields ? data.fields : '*'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

export const getVideosByVideoIds = async (data) => {
    return await callYoutubeApi(
        `videos?key=${data.youtubeApiKey}&id=${data.videoIds}&part=${
            data.part ? data.part : 'snippet'
        }&fields=${data.fields ? data.fields : '*'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

export const getCommentsByVideoIds = async (data) => {
    return await callYoutubeApi(
        `commentThreads?key=${data.youtubeApiKey}&videoId=${data.videoId}&part=${
            data.part ? data.part : 'snippet'
        }&textFormat=${data.textFormat ? data.textFormat : 'html'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};
