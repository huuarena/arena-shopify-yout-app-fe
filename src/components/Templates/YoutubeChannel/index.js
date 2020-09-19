import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../common/Banner';
import Header from '../common/Header';
import VideosPlaylist from '../common/VideosPlaylist';

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
    };
}

class YoutubeChannel extends Component {
    render() {
        const { widget_selected } = this.props;

        const layoutIndex = widget_selected.setting.layout.video.layout.selected;
        const layoutName = widget_selected.setting.layout.video.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            <div className="youtube-channel">
                {widget_selected.setting.layout.header.show &&
                    widget_selected.setting.layout.header.elements.banner.show && <Banner />}
                {widget_selected.setting.layout.header.show && <Header />}
                {/* <VideosPlaylist
                    playlistVariant="horizontal"
                    cardVariant={layoutName !== 'horizontal' ? layoutName : 'classic'}
                /> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(YoutubeChannel);
