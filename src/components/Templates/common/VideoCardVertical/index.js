import { Caption, Heading } from '@shopify/polaris';
import React, { Component } from 'react';
import formatDateTime from '../../../../utils/formatDateTime';

class VideoCardVertical extends Component {
    render() {
        const { video } = this.props;

        console.log('video :>> ', video);

        return (
            <div className="template-video-card-vertical">
                <img alt="" src={video.snippet.thumbnails.high.url} />
                <div className="title">
                    <Heading>{video.snippet.title}</Heading>
                </div>
                <div className="publish-time">
                    <Caption>{formatDateTime(video.snippet.publishTime, 'MM/DD/YYYY')}</Caption>
                </div>
                <div className="description">{video.snippet.description}</div>
                <div className="statistics">
                    <div className="views-counter"></div>
                    <div className="likes-counter"></div>
                    <div className="comments-counter"></div>
                </div>
            </div>
        );
    }
}

export default VideoCardVertical;
