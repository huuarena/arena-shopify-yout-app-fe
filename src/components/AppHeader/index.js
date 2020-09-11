import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import './styles.scss';
import { Page, Tabs, DisplayText } from '@shopify/polaris';

function mapStateToProps(state) {
    return {
        pages: state.pages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class AppHeader extends Component {
    handleTabChange = index => {
        const { pages, actions } = this.props;

        if (index !== pages.selected) {
            actions.switchPagesAction(index);
        }
    };

    render() {
        const { pages } = this.props;

        return (
            <div className="app-header">
                <Page>
                    <div className="header-logo">
                        <div className="app-name">
                            <DisplayText size="small">YouTube Gallery App</DisplayText>
                        </div>
                        <div className="logo" />
                        <div className="actions">
                            <a href="/#">Request free installation</a>
                            <a href="/#">Need help?</a>
                        </div>
                    </div>
                    <div className="header-tabs-block">
                        <Tabs
                            tabs={pages.data}
                            selected={pages.selected}
                            onSelect={index => this.handleTabChange(index)}
                        />
                    </div>
                </Page>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
