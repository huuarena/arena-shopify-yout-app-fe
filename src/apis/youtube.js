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

// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&id=b8K539jjb4g&part=snippet,contentDetails,status,statistics&fields=*&maxResults=20
export const getYoutubeVideosByVideoIds = async (data) => {
    return await callYoutubeApi(
        `videos?key=${data.key}&id=${data.videoIds}&part=${
            data.part ? data.part : 'snippet'
        }&fields=${data.fields ? data.fields : '*'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};

// https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4&videoId=b8K539jjb4g&part=snippet&textFormat=html&maxResults=20
export const getCommentsByVideoIds = async (data) => {
    return await callYoutubeApi(
        `commentThreads?key=${data.key}&videoId=${data.videoId}&part=${
            data.part ? data.part : 'snippet'
        }&textFormat=${data.textFormat ? data.textFormat : 'html'}&maxResults=${
            data.maxResults ? data.maxResults : '20'
        }${data.pageToken ? `&pageToken=${data.pageToken}` : ''}`,
    );
};
