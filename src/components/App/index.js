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
import { Page, Card, Frame } from '@shopify/polaris';
import './styles.scss';

function mapStateToProps(state) {
    return {
        store: state,
        pages: state.pages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class App extends Component {
    renderComponent = index => {
        switch (index) {
            case 0:
                return <Widgets />;

            case 1:
                return <Preferences />;

            case 2:
                return <Support />;

            default:
                return <Widgets />;
        }
    };

    render() {
        const { pages, store } = this.props;

        console.log('App store :>> ', store);

        return (
            <div className="app-main">
                <AppBanner />
                <AppHeader />

                <div className="app-body">
                    <Frame>
                        <Page>
                            <Card>{this.renderComponent(pages.selected)}</Card>
                        </Page>
                    </Frame>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
