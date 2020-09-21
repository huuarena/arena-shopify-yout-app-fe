import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../../actions';
import { getYoutApp } from '../../../apis/yout_app';
import AppHeader from '../AppHeader';
import AppBanner from '../AppBanner';
import Widgets from '../../../pages/Widgets';
import Preferences from '../../../pages/Preferences';
import Support from '../../../pages/Support';
import YoutubeAPIKey from '../../../pages/YoutubeAPIKey';
import { Card, Frame } from '@shopify/polaris';
import Preloader from '../Preloader';
import qs from 'qs';
import Templates from '../Templates';
import { getWidgetById } from '../../../apis/widgets';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        store: state,
        pages: state.pages,
        app_mode: state.app_mode,
        yout_app: state.yout_app,
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
        this.state = { ...INITIAL_STATE };
    }

    // static getDerivedStateFromProps(props, state) {
    //     const { yout_app } = props;

    //     if (JSON.stringify(yout_app.youtube_api) !== '{}') {
    //         return { isReady: true };
    //     }

    //     return null;
    // }

    _getYoutApp = async () => {
        const { actions } = this.props;

        const res = await getYoutApp();
        console.log('getYoutApp res :>> ', res);
        if (res.success) {
            actions.changeYoutAppAction(res.payload);
            this.setState({ isReady: true });
        }
    };

    _getWidgetById = async (id) => {
        const { actions } = this.props;

        const res = await getWidgetById(id);
        console.log('res :>> ', res);
        if (res.success && JSON.stringify(res.payload) !== '{}') {
            actions.changeWidgetSelectedAction(res.payload);
            this.setState({ isReady: true });
        }
    };

    componentDidMount() {
        const { actions } = this.props;
        const { isReady } = this.state;

        const search = qs.parse(window.location.search.substring(1));
        console.log('search :>> ', search);
        if (search.embed) {
            actions.changeAppModeAction(1); // live

            this._getWidgetById(search.embed);
        } else {
            if (!isReady) {
                this._getYoutApp();
            }
        }
    }

    renderComponent = () => {
        const { pages, yout_app } = this.props;

        if (JSON.stringify(yout_app.youtube_api) === '{}') {
            return <YoutubeAPIKey />;
        } else {
            switch (pages.selected) {
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
        }
    };

    render() {
        const { store, app_mode } = this.props;
        const { isReady } = this.state;

        console.log('App store :>> ', store);
        console.log('App widget_selected :>> ', store.widget_selected);

        const renderAppMain = isReady ? (
            <div className="yout-app-main">
                <div className="yout-app-body">
                    <AppBanner />
                    <AppHeader />

                    <div className="page-wrapper">
                        <Frame>
                            <Card>
                                <Card.Section>{this.renderComponent()}</Card.Section>
                            </Card>
                        </Frame>
                    </div>
                </div>
            </div>
        ) : (
            <Preloader />
        );

        switch (app_mode.selected) {
            case 0: // preview
                return renderAppMain;

            case 1: // live
                return (
                    <div className="yout-app-main">
                        <Templates />
                    </div>
                );

            default:
                // preview
                return renderAppMain;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
