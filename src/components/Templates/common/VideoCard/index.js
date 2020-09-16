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
        widgets: state.widgets,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

function VideoCard(props) {
    const { variant, video, widgets, actions } = props;

    return (
        <div
            className={`template-video-card template-video-card-${variant}`}
            onClick={() => actions.changeVideoPlayAction(video)}
        >
            <div className="thumbnail">
                <img alt="" src={video.snippet.thumbnails.standard.url} />
                {widgets.selected.template.layout.video.elements.play_icon.show && (
                    <div className="youtube-icon" />
                )}
                {widgets.selected.template.layout.video.elements.duration.show && (
                    <div className="duration">
                        {formatYoutubeVideoDuration(video.contentDetails.duration)}
                    </div>
                )}
            </div>
            <div className="video-infomation">
                {widgets.selected.template.layout.video.elements.title.show && (
                    <div className="title">{video.snippet.title}</div>
                )}
                {widgets.selected.template.layout.video.elements.date.show && (
                    <div className="publish-time">
                        {formatDateTime(video.snippet.publishedAt, 'MM/DD/YYYY')}
                    </div>
                )}
                {widgets.selected.template.layout.video.elements.description.show && (
                    <div className="description">{video.snippet.description}</div>
                )}
                <div className="statistics">
                    {widgets.selected.template.layout.video.elements.views_counter.show && (
                        <div>{formatLongNumber(video.statistics.viewCount)} Views</div>
                    )}
                    {widgets.selected.template.layout.video.elements.views_counter.show &&
                        widgets.selected.template.layout.video.elements.likes_counter.show && (
                            <div className="divider" />
                        )}
                    {widgets.selected.template.layout.video.elements.likes_counter.show && (
                        <div>{formatLongNumber(video.statistics.likeCount)} Likes</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
