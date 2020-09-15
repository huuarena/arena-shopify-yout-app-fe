import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoCard from '../VideoCard';
import FooterPagination from '../FooterPagination';
import PagiButton from '../PagiButton';

VideosPlaylist.propTypes = {
    videos: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['vertical', 'horizontal']),
};

VideosPlaylist.defaultProps = {
    variant: 'vertical',
};

const INITIAL_STATE = {
    page: 1,
    limit: 3,
};

class VideosPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (window.innerWidth < 600) {
            return { limit: 1 };
        }
        if (window.innerWidth < 900) {
            return { limit: 2 };
        }
        if (window.innerWidth >= 900) {
            return { limit: 3 };
        }

        return null;
    }

    updateWindowDimensions() {
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

    componentDidMount() {
        window.addEventListener('resize', () => this.updateWindowDimensions());
    }

    render() {
        const { videos } = this.props;
        const { page, limit } = this.state;

        return (
            <div className="template-videos-playlist-horizontal">
                <div className="video-list">
                    {videos.items.length > 0 &&
                        videos.items.slice((page - 1) * limit, page * limit).map((item, index) => (
                            <div key={index} className="video-list-item">
                                <VideoCard variant="cinema" video={item} />
                            </div>
                        ))}

                    {page > 1 && (
                        <PagiButton
                            previous={true}
                            onClick={() => this.setState({ page: page - 1 })}
                        />
                    )}
                    {page < parseInt(videos.items.length / limit) + 1 && (
                        <PagiButton
                            previous={false}
                            onClick={() => this.setState({ page: page + 1 })}
                        />
                    )}
                </div>

                <FooterPagination
                    page={page}
                    totalPages={parseInt(videos.items.length / limit) + 1}
                    onChange={(value) => this.setState({ page: value })}
                />
            </div>
        );
    }
}

export default VideosPlaylist;
