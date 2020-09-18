// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import AppHeader from '../AppHeader';
import AppBanner from '../AppBanner';
import Widgets from '../../pages/Widgets';
import Preferences from '../../pages/Preferences';
import Support from '../../pages/Support';
import { Card, Frame } from '@shopify/polaris';
import './styles.scss';
import { getYoutubeApi } from '../../apis/youtubeApi';
import { CONFIG } from '../../config';
import YoutubeAPIKey from '../../pages/YoutubeAPIKey';
import Templates from '../Templates';

function mapStateToProps(state) {
    return {
        store: state,
        pages: state.pages,
        youtube_api: state.youtube_api,
        app_mode: state.app_mode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }
    _getYoutubeApi = async () => {
        const { actions } = this.props;

        const res = await getYoutubeApi(CONFIG.STORE_NAME);
        if (res.success) {
            if (res.payload.key) {
                await actions.changeYoutubeApiAction(res.payload);
                await actions.switchPagesAction(0);
            } else {
                await actions.changeYoutubeApiAction(res.payload);
                await actions.switchPagesAction(1);
            }
        }

        this.setState({ isReady: true });
    };

    componentDidMount() {
        const { youtube_api } = this.props;

        if (!youtube_api.key) {
            this._getYoutubeApi();
        } else {
            this.setState({ isReady: true });
        }
    }

    renderComponent = (index) => {
        switch (index) {
            case 0:
                return <Widgets />;

            case 1:
                return <YoutubeAPIKey />;

            case 2:
                return <Preferences />;

            case 3:
                return <Support />;

            default:
                return <Widgets />;
        }
    };

    render() {
        const { pages, store, app_mode } = this.props;
        const { isReady } = this.state;

        console.log('App store :>> ', store);

        switch (app_mode.mode) {
            case 'preview':
                return (
                    <div className="yout-app-main">
                        <div className="yout-app-body">
                            <AppBanner />
                            <AppHeader />

                            <div className="page-wrapper">
                                <Frame>
                                    {isReady && <Card>{this.renderComponent(pages.selected)}</Card>}
                                </Frame>
                            </div>
                        </div>
                    </div>
                );

            case 'live':
                return (
                    <div className="yout-app-main">
                        <Templates />
                    </div>
                );

            default:
                return (
                    <div className="yout-app-main">
                        <div className="yout-app-body">
                            <AppBanner />
                            <AppHeader />

                            <div className="page-wrapper">
                                <Frame>
                                    {isReady && <Card>{this.renderComponent(pages.selected)}</Card>}
                                </Frame>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
