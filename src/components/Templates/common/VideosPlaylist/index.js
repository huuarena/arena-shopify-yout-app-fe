import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoCard from '../VideoCard';
import FooterPagination from '../FooterPagination';
import PagiButton from '../PagiButton';

const INITIAL_STATE = {
    page: 1,
    limit: 3,

    windowWidth: 0,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_videos: state.youtube_videos,
        app_mode: state.app_mode,
    };
}

class VideosPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.app_mode.mode === 'preview') {
            if (props.playlistVariant === 'horizontal') {
                if (window.innerWidth < 600 + 380) {
                    return { limit: 1 };
                }
                if (window.innerWidth < 900 + 380) {
                    return { limit: 2 };
                }
                if (window.innerWidth >= 900 + 380) {
                    return { limit: 3 };
                }
            }
        } else {
            if (props.playlistVariant === 'horizontal') {
                if (window.innerWidth < 600) {
                    return { limit: 1 };
                }
                if (window.innerWidth < 900) {
                    return { limit: 2 };
                }
                if (window.innerWidth >= 900) {
                    return { limit: 3 };
                }
            }
        }

        return null;
    }

    updateWindowDimensions() {
        const { playlistVariant, app_mode } = this.props;

        if (app_mode.mode === 'preview') {
            if (playlistVariant === 'horizontal') {
                if (window.innerWidth < 600 + 380) {
                    return this.setState({ limit: 1 });
                }
                if (window.innerWidth < 900 + 380) {
                    return this.setState({ limit: 2 });
                }
                if (window.innerWidth >= 900 + 380) {
                    return this.setState({ limit: 3 });
                }
            }
        } else {
            if (playlistVariant === 'horizontal') {
                if (window.innerWidth < 600) {
                    return this.setState({ limit: 1 });
                }
                if (window.innerWidth < 900) {
                    return this.setState({ limit: 2 });
                }
                if (window.innerWidth >= 900) {
                    return this.setState({ limit: 3 });
                }
            }
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: window.innerWidth });
            this.updateWindowDimensions();
        });
    }

    render() {
        const { playlistVariant, cardVariant, youtube_videos, app_mode, widgets } = this.props;
        const { page, limit } = this.state;

        return (
            <div className={`template-videos-playlist template-videos-playlist-${playlistVariant}`}>
                <div className={`video-list video-list-${app_mode.mode}`}>
                    {youtube_videos.items.length > 0 &&
                        youtube_videos.items
                            .slice((page - 1) * limit, page * limit)
                            .map((item, index) => (
                                <div key={index} className="video-list-item">
                                    <VideoCard variant={cardVariant} video={item} />
                                </div>
                            ))}

                    {widgets.selected.template.layout.slider_settings.elements
                        .show_navigation_arrows.show &&
                        page > 1 && (
                            <PagiButton
                                variant={
                                    widgets.selected.template.layout.slider_settings.direction
                                        .selected === 0
                                        ? 'previous'
                                        : 'up'
                                }
                                onClick={() => this.setState({ page: page - 1 })}
                            />
                        )}
                    {widgets.selected.template.layout.slider_settings.elements
                        .show_navigation_arrows.show &&
                        page < parseInt(youtube_videos.items.length / limit) && (
                            <PagiButton
                                variant={
                                    widgets.selected.template.layout.slider_settings.direction
                                        .selected === 0
                                        ? 'next'
                                        : 'down'
                                }
                                onClick={() => this.setState({ page: page + 1 })}
                            />
                        )}
                </div>

                {widgets.selected.template.layout.slider_settings.elements.show_pagination.show && (
                    <FooterPagination
                        page={page}
                        totalPages={parseInt(youtube_videos.items.length / limit)}
                        onChange={(value) => this.setState({ page: value })}
                    />
                )}
            </div>
        );
    }
}

VideosPlaylist.propTypes = {
    playlistVariant: PropTypes.oneOf(['vertical', 'horizontal']),
    cardVariant: PropTypes.oneOf(['classic', 'horizontal', 'cinema']),
};

VideosPlaylist.defaultProps = {
    playlistVariant: 'horizontal',
    cardVariant: 'classic',
};

export default connect(mapStateToProps)(VideosPlaylist);
