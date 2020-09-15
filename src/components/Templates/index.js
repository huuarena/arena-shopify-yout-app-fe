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
import { getVideos } from '../../apis/videos';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_channel: state.youtube_channel,
        videos: state.videos,
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
            JSON.stringify(props.widgets.selected.template) !== '{}' &&
            JSON.stringify(props.videos) !== '{}' &&
            JSON.stringify(props.youtube_channel) !== '{}'
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

    _getVideos = async () => {
        const { actions } = this.props;

        const res = await getVideos(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeVideosAction(res.payload);
        }
    };

    componentDidMount() {
        const { isReady } = this.state;
        const { widgets, youtube_channel, videos } = this.props;

        if (!isReady) {
            if (JSON.stringify(widgets.selected) === '{}') {
                this._getWidgets();
            }

            if (JSON.stringify(youtube_channel) === '{}') {
                this._getYoutubeChannel();
            }

            if (JSON.stringify(videos) === '{}') {
                this._getVideos();
            }
        }
    }

    renderComponent = () => {
        const { widgets } = this.props;

        if (JSON.stringify(widgets.selected.selected) !== '{}') {
            switch (widgets.selected.id) {
                case templates[0].id:
                    return <YoutubeChannel widget={widgets.selected} />;

                // case templates[1].id:
                //     return <VideoGrid widget={widgets.selected} />;

                default:
                    return <YoutubeChannel widget={widgets.selected} />;
            }
        }
    };
    render() {
        const { isReady } = this.state;

        console.log('Template this.props :>> ', this.props);

        return <div className="yout-app-templates">{isReady && this.renderComponent()}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
