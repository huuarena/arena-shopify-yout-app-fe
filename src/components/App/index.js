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
import { Page, Card } from '@shopify/polaris';
import './styles.scss';

function mapStateToProps(state) {
    return {
        store: state,
        current_page: state.page_tabs.current_page,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class App extends Component {
    componentDidMount() {
        console.log('App this.props', this.props);
    }

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
        const { current_page } = this.props;

        return (
            <div className="app-main">
                <AppBanner />
                <AppHeader />

                <div className="app-body">
                    <Page>
                        <Card>{this.renderComponent(current_page)}</Card>
                    </Page>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
