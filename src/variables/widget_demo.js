import youtube_channel_demo from './youtube_channel_demo';
import youtube_channel_videos_demo from './youtube_channel_videos_demo';
import youtube_videos_demo from './youtube_videos_demo';

const widget_demo = {
    id: `${Math.random().toString(36).substring(2)}-${Math.random()
        .toString(36)
        .substring(2)}-${new Date().getTime()}`,
    name: `widget-${new Date().getTime()}`,
    youtube_channel_source: {
        url: 'https://www.youtube.com/channel/UCk9ft9Cy-uh0I2goL48KASg',
        channelId: 'UCk9ft9Cy-uh0I2goL48KASg',
    },
    youtube_channel: youtube_channel_demo,
    youtube_channel_custom: {
        channel_name: '',
        channel_description: '',
        channel_avatar: {
            url: '',
        },
        channel_banner: {
            url: '',
        },
    },
    youtube_channel_videos: youtube_channel_videos_demo,
    youtube_videos: youtube_videos_demo,
    youtube_comments: {},
    setting: {},
    created_at: new Date().getTime(),
    updated_att: new Date().getTime(),
    enabled: false,
};

export default widget_demo;
