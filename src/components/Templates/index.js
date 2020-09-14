import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import YoutubeChannel from './YoutubeChannel';
import VideoGrid from './VideoGrid';
import { getWidgets } from '../../apis/widgets';
import './styles.scss';
// import { getYoutubeChannelData } from '../../apis/youtube';
import { templates } from './../../utils/variables';

const INITIAL_STATE = {
    isReady: false,
};

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

class Templates extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (Object.keys(props.widgets.selected).length > 0) {
            return { isReady: true };
        }

        return null;
    }

    _getWidgets = async () => {
        const { actions } = this.props;

        const res = await getWidgets();
        if (res.success) {
            await actions.changeWidgetsAction(res.payload);

            // // get youtube channel data
            // const startIndexChannelId = res.payload.selected.template.source.url.indexOf('channel/');
            // const channelId = res.payload.selected.template.source.url.slice(
            //     startIndexChannelId + 8,
            //     res.payload.selected.template.source.url.length,
            // );
            // const data = { channelId };
            // const _res = await getYoutubeChannelData(data);
            // if (_res.success) {
            //     await actions.changeYoutubeChannelAction(_res.payload);
            // }
        }
    };

    componentDidMount() {
        const { isReady } = this.state;

        if (!isReady) {
            this._getWidgets();
        }
    }

    renderComponent = () => {
        const { widgets } = this.props;

        if (Object.keys(widgets.selected).length > 0) {
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
