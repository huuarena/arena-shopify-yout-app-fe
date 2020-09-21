import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../../actions';
import YoutubeChannel from './YoutubeChannel';
import VideoGrid from './VideoGrid';
import './styles.scss';
import PlayVideoPopup from './common/PlayVideoPopup';
import settings from './../../../variables/settings';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
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
        const { widget_selected } = props;

        if (
            JSON.stringify(widget_selected) !== '{}' &&
            JSON.stringify(widget_selected.setting) !== '{}'
        ) {
            return { isReady: true };
        }

        return null;
    }

    renderComponent = () => {
        const { widget_selected } = this.props;

        switch (widget_selected.setting.id) {
            case settings[0].id:
                return <YoutubeChannel />;

            // case templates[1].id:
            //     return <VideoGrid />;

            default:
                return <YoutubeChannel />;
        }
    };

    render() {
        const { widget_selected, video_play } = this.props;
        const { isReady } = this.state;

        return (
            <div id={widget_selected.id} className="yout-app-templates-preview">
                {isReady && this.renderComponent()}

                {JSON.stringify(widget_selected) !== '{}' &&
                    JSON.stringify(widget_selected.setting) !== '{}' &&
                    widget_selected.setting.layout.video.mode.selected === 0 &&
                    JSON.stringify(video_play) !== '{}' && <PlayVideoPopup />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
