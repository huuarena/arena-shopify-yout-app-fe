import React, { Component } from 'react';
import Banner from '../common/Banner';
import Header from '../common/Header';
import VideosPlaylistHorizontal from '../common/VideosPlaylistHorizontal';

class YoutubeChannel extends Component {
    render() {
        return (
            <div className="youtube-channel">
                <Banner />
                <Header />
                <VideosPlaylistHorizontal />
            </div>
        );
    }
}

export default YoutubeChannel;
