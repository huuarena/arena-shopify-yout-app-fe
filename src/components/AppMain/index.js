import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { getYoutApp } from '../../apis/yout_app';
import AppHeader from '../AppHeader';
import AppBanner from '../AppBanner';
import Widgets from '../../pages/Widgets';
import Preferences from '../../pages/Preferences';
import Support from '../../pages/Support';
import YoutubeAPIKey from '../../pages/YoutubeAPIKey';
import '@shopify/polaris/dist/styles.css';
import { Card, Frame } from '@shopify/polaris';
import Preloader from '../Preloader';

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

    static getDerivedStateFromProps(props, state) {
        const { yout_app } = props;

        if (JSON.stringify(yout_app.youtube_api) !== '{}') {
            return { isReady: true };
        }

        return null;
    }

    _getYoutApp = async () => {
        const { actions } = this.props;

        const res = await getYoutApp();
        console.log('getYoutApp res :>> ', res);
        if (res.success) {
            actions.changeYoutAppAction(res.payload);
            this.setState({ isReady: true });
        }
    };

    componentDidMount() {
        const { isReady } = this.state;

        if (!isReady) {
            this._getYoutApp();
        }
    }

    renderComponent = () => {
        const { pages, yout_app } = this.props;

        if (JSON.stringify(yout_app.youtube_api) === '{}') {
            console.log('required youtube api');
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
        const { pages, store, app_mode } = this.props;
        const { isReady } = this.state;

        console.log('App store :>> ', store);

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
            case 0:
                return renderAppMain;

            case 1:
                return <div className="yout-app-main">{/* <Templates /> */}</div>;

            default:
                return renderAppMain;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
