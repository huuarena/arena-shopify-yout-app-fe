import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from './../../../../actions';
import { bindActionCreators } from 'redux';
import formatDateTime from '../../../../utils/formatDateTime';
import formatLongNumber from '../../../../utils/formatLongNumber';
import SubscribeButton from '../SubscribeButton';
import Logo from '../Logo';

const INITIAL_STATE = {
    showMore: false,
    comments: {},
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

class PlayVideoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    renderCommentItem = (item, index) => {
        const comment = item.snippet.topLevelComment.snippet;

        return (
            <div className="comment-item" key={index}>
                <div className="user-avatar">
                    <a href={comment.authorChannelUrl} target="_blank" rel="noopener noreferrer">
                        <img alt="" src={comment.authorProfileImageUrl} />
                    </a>
                </div>
                <div className="comment-body">
                    <div className="user-name">
                        <a
                            href={comment.authorChannelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="user-name-text">{comment.authorDisplayName}</div>
                        </a>
                        <div className="published-at">
                            {formatDateTime(comment.publishedAt, 'MM/DD/YYYY')}
                        </div>
                    </div>
                    <div className="comment-text">{comment.textDisplay}</div>
                    {comment.likeCount > 0 && (
                        <div className="comment-report">
                            <div className="like-icon"></div>
                            <div>{comment.likeCount}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { video_play, widget_selected, actions } = this.props;
        const { showMore, comments } = this.state;

        return JSON.stringify(video_play) !== '{}' ? (
            <div className="yout-popup-wrapper">
                <div
                    className="yout-popup-wrapper-padding"
                    onClick={() => actions.changeVideoPlayAction({})}
                />
                <div className="yout-popup-wrapper-body">
                    <div
                        className="yout-popup-header"
                        onClick={() => actions.changeVideoPlayAction({})}
                    >
                        <div className="close-icon" />
                    </div>

                    <div className="yout-popup-body">
                        <div id="yout-popup-video-overlay" className="yout-popup-video-overlay">
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

                        <div className="video-info">
                            <div className="video-info-header">
                                {widget_selected.setting.layout.popup.elements.title.show && (
                                    <div className="video-info-title">
                                        {video_play.snippet.title}
                                    </div>
                                )}

                                <div className="video-info-statistics">
                                    {widget_selected.setting.layout.popup.elements.views_counter
                                        .show && (
                                        <div className="views-count">
                                            {formatLongNumber(video_play.statistics.viewCount)}{' '}
                                            Views
                                        </div>
                                    )}
                                    <div className="more">
                                        {widget_selected.setting.layout.popup.elements.likes_counter
                                            .show && (
                                            <div className="likes-count">
                                                <div className="icon like-icon"></div>
                                                <div>
                                                    {formatLongNumber(
                                                        video_play.statistics.likeCount,
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {widget_selected.setting.layout.popup.elements
                                            .dislikes_counter.show && (
                                            <div className="dislikes-count">
                                                <div className="icon dislike-icon"></div>
                                                <div>
                                                    {formatLongNumber(
                                                        video_play.statistics.dislikeCount,
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {widget_selected.setting.layout.popup.elements.share_button
                                            .show && (
                                            <div className="share">
                                                <div className="icon share-icon"></div>
                                                <div className="content">SHARE</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="channel-info">
                                {widget_selected.setting.layout.popup.elements.channel_logo
                                    .show && <Logo />}
                                <div className="channel-info-more">
                                    {widget_selected.setting.layout.popup.elements.channel_name
                                        .show && (
                                        <div className="template-channel-name">
                                            <a
                                                href={widget_selected.youtube_channel_source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {widget_selected.youtube_channel_custom
                                                    .channel_name ||
                                                    widget_selected.youtube_channel.items[0].snippet
                                                        .title}
                                            </a>
                                        </div>
                                    )}
                                    {widget_selected.setting.layout.popup.elements.date.show && (
                                        <div className="template-video-publish">
                                            Published at{' '}
                                            {formatDateTime(
                                                video_play.snippet.publishedAt,
                                                'MM/DD/YYYY',
                                            )}
                                        </div>
                                    )}
                                    {widget_selected.setting.layout.popup.elements.description
                                        .show && (
                                        <div className="channel-description">
                                            <div
                                                className={`channel-description-content ${
                                                    showMore &&
                                                    'channel-description-content-show-more'
                                                }`}
                                            >
                                                {widget_selected.youtube_channel.items[0].snippet.description
                                                    .split('\n')
                                                    .map((item, index) => (
                                                        <div key={index}>{item}</div>
                                                    ))}
                                            </div>
                                            {widget_selected.setting.layout.popup.elements
                                                .description_more_button.show && (
                                                <span
                                                    className="show-more"
                                                    onClick={() =>
                                                        this.setState({ showMore: !showMore })
                                                    }
                                                >
                                                    {showMore ? 'SHOW LESS' : 'SHOW MORE'}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {widget_selected.setting.layout.popup.elements.subcribe_button
                                    .show && <SubscribeButton />}
                            </div>
                        </div>

                        {/* <div className="yout-popup-video-comments">
                            {JSON.stringify(comments) !== '{}' &&
                                comments.items.map((item, index) =>
                                    this.renderCommentItem(item, index),
                                )}
                        </div> */}
                    </div>
                </div>
                <div
                    className="yout-popup-wrapper-padding"
                    onClick={() => actions.changeVideoPlayAction({})}
                />
            </div>
        ) : (
            <div></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayVideoPopup);
