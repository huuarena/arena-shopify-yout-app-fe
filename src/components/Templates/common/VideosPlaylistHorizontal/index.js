import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoCardVertical from '../VideoCardVertical';

function mapStateToProps(state) {
    return {
        youtube_channel: state.youtube_channel,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class VideosPlaylistHorizontal extends Component {
    render() {
        const { youtube_channel } = this.props;

        console.log('youtube_channel :>> ', youtube_channel);

        return (
            <div className="template-videos-playlist-horizontal">
                {youtube_channel.items.length > 0 &&
                    youtube_channel.items
                        .slice(0, 3)
                        .map((item, index) => <VideoCardVertical key={index} video={item} />)}
            </div>
        );
    }
}

export default connect(mapStateToProps)(VideosPlaylistHorizontal);
