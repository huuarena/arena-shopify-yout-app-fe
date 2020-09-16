import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../common/Banner';
import Header from '../common/Header';
import VideosPlaylist from '../common/VideosPlaylist';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class YoutubeChannel extends Component {
    render() {
        const { widgets } = this.props;

        const layoutIndex = widgets.selected.template.layout.video.layout.selected;
        const layoutName = widgets.selected.template.layout.video.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            <div className="youtube-channel">
                {widgets.selected.template.layout.header.show && <Banner />}
                {widgets.selected.template.layout.header.show && <Header />}
                <VideosPlaylist
                    playlistVariant="horizontal"
                    cardVariant={layoutName !== 'horizontal' ? layoutName : 'classic'}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(YoutubeChannel);
