import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import './styles.scss';
import { Tabs, Card } from '@shopify/polaris';

function mapStateToProps(state) {
    return {
        pages: state.pages,
        youtube_api: state.youtube_api,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class AppHeader extends Component {
    handleTabChange = (index) => {
        const { pages, actions, youtube_api } = this.props;

        if (JSON.stringify(youtube_api) === '{}' || !youtube_api.key) {
            return actions.switchPagesAction(1);
        }

        if (index !== pages.selected) {
            actions.switchPagesAction(index);
        }
    };

    render() {
        const { pages } = this.props;

        return (
            <div className="app-header">
                <div className="page-wrapper">
                    <div className="header-logo">
                        <div className="app-name">YouTube Gallery App</div>
                        <div className="logo" />
                        <div className="actions">
                            <a href="/#">Request free installation</a>
                            <a href="/#">Need help?</a>
                        </div>
                    </div>
                    <div className="header-tabs-block">
                        <Card>
                            <Tabs
                                tabs={pages.data}
                                selected={pages.selected}
                                onSelect={(index) => this.handleTabChange(index)}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
