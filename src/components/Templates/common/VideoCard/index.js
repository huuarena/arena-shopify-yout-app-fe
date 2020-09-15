import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../../../../utils/formatDateTime';
import formatLongNumber from '../../../../utils/formatLongNumber';

VideoCard.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal', 'cinema']),
    video: PropTypes.object,
};

VideoCard.defaultProps = {
    variant: 'vertical',
};

function VideoCard(props) {
    const { variant, video } = props;

    return (
        <div className={`template-video-card template-video-card-${variant}`}>
            <div className="thumbnail">
                <img alt="" src={video.snippet.thumbnails.standard.url} />
                <div className="youtube-icon" />
            </div>
            <div className="video-infomation">
                <div className="title">{video.snippet.title}</div>
                <div className="publish-time">
                    {formatDateTime(video.snippet.publishedAt, 'MM/DD/YYYY')}
                </div>
                <div className="description">{video.snippet.description}</div>
                <div className="statistics">
                    <div>{formatLongNumber(video.statistics.viewCount)} Views</div>
                    <div className="divider" />
                    <div>{formatLongNumber(video.statistics.likeCount)} Likes</div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
