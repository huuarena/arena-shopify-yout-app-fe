// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import AppHeader from '../AppHeader';
import AppBanner from '../AppBanner';
import Widgets from '../Widgets';
import Preferences from '../Preferences';
import Support from '../Support';
import { Card, Frame, Page } from '@shopify/polaris';
import './styles.scss';
import { getYoutubeApi } from '../../apis/youtubeApi';
import { CONFIG } from '../../config';
import YoutubeAPIKey from '../YoutubeAPIKey';
import Templates from '../Templates';

function mapStateToProps(state) {
    return {
        store: state,
        pages: state.pages,
        youtube_api: state.youtube_api,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class App extends Component {
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
        const { pages, store } = this.props;
        const { isReady } = this.state;

        // console.log('App store :>> ', store);

        // return (
        //     <div className="app-main">
        //         <AppBanner />
        //         <AppHeader />

        //         <div className="app-body">
        //             <Frame>
        //                 <Page>
        //                     {isReady && <Card>{this.renderComponent(pages.selected)}</Card>}
        //                 </Page>
        //             </Frame>
        //         </div>
        //     </div>
        // );

        return (
            <div className="app-main">
                <Templates />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
