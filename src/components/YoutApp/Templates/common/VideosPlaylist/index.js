import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoCard from '../VideoCard';
import FooterPagination from '../FooterPagination';
import PagiButton from '../PagiButton';
import './styles.scss';

const INITIAL_STATE = {
    page: 1,
    limit: 3,

    windowWidth: 0,
};

function mapStateToProps(state) {
    return {
        app_mode: state.app_mode,
        widget_selected: state.widget_selected,
    };
}

class VideosPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        const { app_mode } = props;

        if (app_mode.selected === 0) {
            // preview
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
            // live
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

        if (app_mode.selected === 0) {
            // preview
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
            // live
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
        const { playlistVariant, cardVariant, app_mode, widget_selected } = this.props;
        const { page, limit } = this.state;
        const { youtube_videos } = widget_selected;

        return (
            <div className={`template-videos-playlist template-videos-playlist-${playlistVariant}`}>
                <div className={`video-list video-list-${app_mode.data[app_mode.selected]}`}>
                    {youtube_videos.items.length > 0 &&
                        youtube_videos.items
                            .slice((page - 1) * limit, page * limit)
                            .map((item, index) => (
                                <div key={index} className="video-list-item">
                                    <VideoCard variant={cardVariant} video={item} />
                                </div>
                            ))}

                    {widget_selected.setting.layout.slider_settings.elements.show_navigation_arrows
                        .show &&
                        page > 1 && (
                            <PagiButton
                                variant={
                                    widget_selected.setting.layout.slider_settings.direction
                                        .selected === 0
                                        ? 'previous'
                                        : 'up'
                                }
                                onClick={() => this.setState({ page: page - 1 })}
                            />
                        )}
                    {widget_selected.setting.layout.slider_settings.elements.show_navigation_arrows
                        .show &&
                        page < parseInt(youtube_videos.items.length / limit) && (
                            <PagiButton
                                variant={
                                    widget_selected.setting.layout.slider_settings.direction
                                        .selected === 0
                                        ? 'next'
                                        : 'down'
                                }
                                onClick={() => this.setState({ page: page + 1 })}
                            />
                        )}
                </div>

                {widget_selected.setting.layout.slider_settings.elements.show_pagination.show && (
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
