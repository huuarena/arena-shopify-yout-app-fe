import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import YoutubeChannel from './YoutubeChannel';
import VideoGrid from './VideoGrid';
import './styles.scss';
import { templates } from '../../variables';
import { CONFIG } from '../../config';
import { getWidgets } from '../../apis/widgets';
import { getYoutubeChannel } from '../../apis/youtubeChannel';
import { getYoutubeVideos } from '../../apis/youtubeVideos';
import PlayVideoPopup from './common/PlayVideoPopup';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_api: state.youtube_api,
        youtube_channel: state.youtube_channel,
        youtube_videos: state.youtube_videos,
        video_play: state.video_play,
        app_mode: state.app_mode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class Templates extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (
            JSON.stringify(props.widgets.selected) !== '{}' &&
            JSON.stringify(props.widgets.selected.template) !== '{}' &&
            JSON.stringify(props.youtube_api) !== '{}' &&
            JSON.stringify(props.youtube_channel) !== '{}' &&
            JSON.stringify(props.youtube_videos) !== '{}'
        ) {
            return { isReady: true };
        }

        return null;
    }

    _getWidgets = async () => {
        const { actions } = this.props;

        const res = await getWidgets(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeWidgetsAction(res.payload);
        }
    };

    _getYoutubeChannel = async () => {
        const { actions } = this.props;

        const res = await getYoutubeChannel(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeChannelAction(res.payload);
        }
    };

    _getYoutubeVideos = async () => {
        const { actions } = this.props;

        const res = await getYoutubeVideos(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeVideosAction(res.payload);
        }
    };

    componentDidMount() {
        const { isReady } = this.state;
        const { widgets, youtube_channel, youtube_videos, app_mode } = this.props;

        if (!isReady) {
            if (
                app_mode.mode === 'live' &&
                (JSON.stringify(widgets.selected) === '{}' ||
                    JSON.stringify(widgets.selected.template) === '{}')
            ) {
                this._getWidgets();
            }

            if (JSON.stringify(youtube_channel) === '{}') {
                this._getYoutubeChannel();
            }

            if (JSON.stringify(youtube_videos) === '{}') {
                this._getYoutubeVideos();
            }
        }
    }

    renderComponent = () => {
        const { widgets } = this.props;

        switch (widgets.selected.id) {
            case templates[0].id:
                return <YoutubeChannel />;

            // case templates[1].id:
            //     return <VideoGrid />;

            default:
                return <YoutubeChannel />;
        }
    };

    render() {
        const { widgets, video_play } = this.props;
        const { isReady } = this.state;

        if (isReady) {
            console.log('Template this.props :>> ', this.props);
        }

        return (
            <div className="yout-app-templates-preview">
                {isReady && this.renderComponent()}

                {JSON.stringify(widgets.selected) !== '{}' &&
                    JSON.stringify(widgets.selected.template) !== '{}' &&
                    widgets.selected.template.layout.video.mode.selected === 0 &&
                    JSON.stringify(video_play) !== '{}' && <PlayVideoPopup />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
