import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from './../../../../actions';
import { bindActionCreators } from 'redux';
import { getYoutubeComments } from '../../../../apis/youtubeComments';
import { CONFIG } from '../../../../config';
import formatDateTime from '../../../../utils/formatDateTime';
import formatLongNumber from '../../../../utils/formatLongNumber';

const INITIAL_STATE = {
    showMore: false,
    comments: {},
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        video_play: state.video_play,
        youtube_comments: state.youtube_comments,
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

    static getDerivedStateFromProps(props, state) {
        if (props.youtube_comments.length > 0) {
            for (let i = 0; i < props.youtube_comments.length; i++) {
                if (props.youtube_comments[i].videoId === props.video_play.id) {
                    return { comments: props.youtube_comments[i] };
                }
            }
        }

        return null;
    }

    _getYoutubeComments = async () => {
        const { actions } = this.props;

        const res = await getYoutubeComments(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeCommentsAction(res.payload);
        }
    };

    componentDidMount() {
        const { youtube_comments } = this.props;

        if (!youtube_comments.length) {
            this._getYoutubeComments();
        }
    }

    componentWillUnmount() {
        this.setState({ ...INITIAL_STATE });
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
        const { video_play, widgets, actions } = this.props;
        const { showMore, comments } = this.state;

        return JSON.stringify(video_play) !== '{}' ? (
            <div className="yout-popup-wrapper">
                <div className="yout-popup-wrapper-padding" onClick={() => actions.changeVideoPlayAction({})} />
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
                                {widgets.selected.template.layout.popup.elements.title.show && (
                                    <div className="video-info-title">
                                        {video_play.snippet.title}
                                    </div>
                                )}

                                <div className="video-info-statistics">
                                    {widgets.selected.template.layout.popup.elements.views_counter
                                        .show && (
                                        <div className="views-count">
                                            {formatLongNumber(video_play.statistics.viewCount)}{' '}
                                            Views
                                        </div>
                                    )}
                                    <div className="more">
                                        {widgets.selected.template.layout.popup.elements
                                            .likes_counter.show && (
                                            <div className="likes-count">
                                                <div className="icon like-icon"></div>
                                                <div>
                                                    {formatLongNumber(
                                                        video_play.statistics.likeCount,
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {widgets.selected.template.layout.popup.elements
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
                                        {widgets.selected.template.layout.popup.elements
                                            .share_button.show && (
                                            <div className="share">
                                                <div className="icon share-icon"></div>
                                                <div className="content">SHARE</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="channel-info">
                                {widgets.selected.template.layout.popup.elements.channel_logo
                                    .show && (
                                    <div className="channel-info-logo">
                                        <div className="template-logo">
                                            <a
                                                href={widgets.selected.template.source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    alt=""
                                                    src={
                                                        widgets.selected.template.layout.header
                                                            .elements.logo.url
                                                    }
                                                />
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div className="channel-info-more">
                                    {widgets.selected.template.layout.popup.elements.channel_name
                                        .show && (
                                        <div className="template-channel-name">
                                            <a
                                                href={widgets.selected.template.source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {
                                                    widgets.selected.template.layout.header.elements
                                                        .channel_name.value
                                                }
                                            </a>
                                        </div>
                                    )}
                                    {widgets.selected.template.layout.popup.elements.date.show && (
                                        <div className="template-video-publish">
                                            Published at{' '}
                                            {formatDateTime(
                                                video_play.snippet.publishedAt,
                                                'MM/DD/YYYY',
                                            )}
                                        </div>
                                    )}
                                    {widgets.selected.template.layout.popup.elements.description
                                        .show && (
                                        <div className="channel-description">
                                            <div
                                                className={`channel-description-content ${
                                                    showMore &&
                                                    'channel-description-content-show-more'
                                                }`}
                                            >
                                                {widgets.selected.template.layout.header.elements.channel_description.value
                                                    .split('\n')
                                                    .map((item, index) => (
                                                        <div key={index}>{item}</div>
                                                    ))}
                                            </div>
                                            {widgets.selected.template.layout.popup.elements
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
                                {widgets.selected.template.layout.popup.elements.subcribe_button
                                    .show && (
                                    <div className="channel-info-subscribe-button">
                                        <div className="template-subscribe-button">
                                            <div className="youtube-logo">
                                                <div className="youtube-icon" />
                                                <div>Youtube</div>
                                            </div>
                                            <div className="subscribers-counter">
                                                {formatLongNumber(
                                                    widgets.selected.template.layout.header.elements
                                                        .subscribers_counter.value,
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="yout-popup-video-comments">
                            {JSON.stringify(comments) !== '{}' &&
                                comments.items.map((item, index) =>
                                    this.renderCommentItem(item, index),
                                )}
                        </div>
                    </div>
                </div>
                <div className="yout-popup-wrapper-padding" onClick={() => actions.changeVideoPlayAction({})} />
            </div>
        ) : (
            <div></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayVideoPopup);
