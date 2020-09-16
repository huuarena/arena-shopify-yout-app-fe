import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formatDateTime from '../../../../utils/formatDateTime';
import formatLongNumber from '../../../../utils/formatLongNumber';
import ChannelName from '../ChannelName';
import Header from '../Header';
import Actions from './../../../../actions';

const INITIAL_STATE = {
    showMore: false,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
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

    render() {
        const { video_play, widgets, actions } = this.props;
        const { showMore } = this.state;

        console.log('video_play :>> ', video_play);

        return JSON.stringify(video_play) !== '{}' ? (
            <div className="yout-popup-wrapper">
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
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video_play.id}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="video-info">
                            <div className="video-info-header">
                                <div className="video-info-title">{video_play.snippet.title}</div>
                                <div className="video-info-statistics">
                                    <div className="views-count">
                                        {formatLongNumber(video_play.statistics.viewCount)} Views
                                    </div>
                                    <div className="more">
                                        <div className="likes-count">
                                            <div className="icon like-icon"></div>
                                            <div>
                                                {formatLongNumber(video_play.statistics.likeCount)}
                                            </div>
                                        </div>
                                        <div className="dislikes-count">
                                            <div className="icon dislike-icon"></div>
                                            <div>
                                                {formatLongNumber(
                                                    video_play.statistics.dislikeCount,
                                                )}
                                            </div>
                                        </div>
                                        <div className="share">
                                            <div className="icon share-icon"></div>
                                            <div className="content">SHARE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="channel-info">
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
                                                    widgets.selected.template.layout.header.elements
                                                        .logo.url
                                                }
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="channel-info-more">
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
                                    <div className="template-video-publish">
                                        Published at{' '}
                                        {formatDateTime(
                                            video_play.snippet.publishedAt,
                                            'MM/DD/YYYY',
                                        )}
                                    </div>
                                    <div className="channel-description">
                                        <div
                                            className={`channel-description-content ${
                                                showMore && 'channel-description-content-show-more'
                                            }`}
                                        >
                                            {
                                                widgets.selected.template.layout.header.elements
                                                    .channel_description.value
                                            }
                                        </div>
                                        <span
                                            className="show-more"
                                            onClick={() => this.setState({ showMore: !showMore })}
                                        >
                                            {showMore ? 'SHOW LESS' : 'SHOW MORE'}
                                        </span>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayVideoPopup);
