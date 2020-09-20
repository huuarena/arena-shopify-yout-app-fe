import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../../../actions';
import formatDateTime from '../../../../utils/formatDateTime';
import formatLongNumber from '../../../../utils/formatLongNumber';
import formatYoutubeVideoDuration from '../../../../utils/formatYoutubeVideoDuration';

VideoCard.propTypes = {
    variant: PropTypes.oneOf(['classic', 'horizontal', 'cinema']),
    video: PropTypes.object,
};

VideoCard.defaultProps = {
    variant: 'classic',
};

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
        video_play: state.video_play,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

function VideoCard(props) {
    const { variant, video, widget_selected, actions, video_play } = props;

    return (
        <div
            className={`template-video-card template-video-card-${variant}`}
            onClick={() =>
                widget_selected.setting.layout.video.mode.selected === 2
                    ? window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')
                    : actions.changeVideoPlayAction(video)
            }
        >
            <div className="thumbnail">
                <img alt="" src={video.snippet.thumbnails.high.url} />
                {widget_selected.setting.layout.video.elements.play_icon.show && (
                    <div className="youtube-icon" />
                )}
                {widget_selected.setting.layout.video.elements.duration.show && (
                    <div className="duration">
                        {formatYoutubeVideoDuration(video.contentDetails.duration)}
                    </div>
                )}
                {JSON.stringify(video_play) !== '{}' &&
                    video_play.id === video.id &&
                    widget_selected.setting.layout.video.mode.selected === 1 && (
                        <div className="video-play">
                            <iframe
                                title="youtube video"
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video_play.id}?autoplay=1`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
            </div>
            <div className="video-infomation">
                {widget_selected.setting.layout.video.elements.title.show && (
                    <div className="title">{video.snippet.title}</div>
                )}
                {widget_selected.setting.layout.video.elements.date.show && (
                    <div className="publish-time">
                        {formatDateTime(video.snippet.publishedAt, 'MM/DD/YYYY')}
                    </div>
                )}
                {widget_selected.setting.layout.video.elements.description.show && (
                    <div className="description">{video.snippet.description}</div>
                )}
                <div className="statistics">
                    {widget_selected.setting.layout.video.elements.views_counter.show && (
                        <div>{formatLongNumber(video.statistics.viewCount)} Views</div>
                    )}
                    {widget_selected.setting.layout.video.elements.views_counter.show &&
                        widget_selected.setting.layout.video.elements.likes_counter.show && (
                            <div className="divider" />
                        )}
                    {widget_selected.setting.layout.video.elements.likes_counter.show && (
                        <div>{formatLongNumber(video.statistics.likeCount)} Likes</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
