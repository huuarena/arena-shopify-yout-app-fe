import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../../actions';
import Banner from '../common/Banner';
import Header from '../common/Header';
import VideosPlaylistHorizontal from '../common/VideosPlaylistHorizontal';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class YoutubeChannel extends Component {
    render() {
        const { widgets } = this.props;

        return (
            <div className="youtube-channel">
                {widgets.selected.template.layout.header.show && <Banner />}
                {widgets.selected.template.layout.header.show && <Header />}
                <VideosPlaylistHorizontal />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeChannel);
