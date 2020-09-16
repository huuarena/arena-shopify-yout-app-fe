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
import { getYoutubeApi } from '../../apis/youtubeApi';
import PlayVideoPopup from './common/PlayVideoPopup';
import { getCommentsByVideoIds, getYoutubeVideosByVideoIds } from '../../apis/youtube';
import { updateYoutubeComments } from '../../apis/youtubeComments';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_channel: state.youtube_channel,
        youtube_videos: state.youtube_videos,
        youtube_api: state.youtube_api,
        youtube_comments: state.youtube_comments,
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
            JSON.stringify(props.youtube_channel) !== '{}' &&
            props.youtube_api.key &&
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
        const { actions, youtube_videos } = this.props;

        const res = await getYoutubeVideos(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeVideosAction(res.payload);

            let videoId = [];
            res.payload.items.forEach((element) => {
                videoId.push(element.id);
            });
            console.log('videoId :>> ', videoId);

            let comments = [];
            for (let i = 0; i < videoId.length; i++) {
                const data = {
                    key: 'AIzaSyDV8KcZPB1I6E9FvGe_IRQcuUTBsMfQFu4',
                    videoId: videoId[i],
                };
                const _res = await getCommentsByVideoIds(data);
                if (_res.success) {
                    let newComment = { ..._res.payload };
                    newComment.videoId = videoId[i];
                    comments.push(newComment);
                }
            }
            console.log('comments :>> ', comments);

            const data_stringfy = JSON.stringify(comments);
            const __res = await updateYoutubeComments(CONFIG.STORE_NAME, data_stringfy);
            console.log('__res :>> ', __res);
        }
    };

    componentDidMount() {
        const { isReady } = this.state;
        const { widgets, youtube_channel, youtube_videos } = this.props;

        if (!isReady) {
            if (
                JSON.stringify(widgets.selected) === '{}' ||
                JSON.stringify(widgets.selected.template) === '{}'
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
        const { widgets, youtube_videos } = this.props;

        if (
            JSON.stringify(widgets.selected) !== '{}' &&
            JSON.stringify(widgets.selected.template) !== '{}'
        ) {
            switch (widgets.selected.id) {
                case templates[0].id:
                    return <YoutubeChannel />;

                // case templates[1].id:
                //     return <VideoGrid />;

                default:
                    return <YoutubeChannel />;
            }
        }
    };

    render() {
        const { isReady } = this.state;

        if (isReady) {
            console.log('Template this.props :>> ', this.props);
        }

        return (
            <div className="yout-app-templates">
                {isReady && this.renderComponent()}
                <PlayVideoPopup />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
