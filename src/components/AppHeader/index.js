import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from './../../actions'
import './styles.scss'
import { Page, Tabs, DisplayText } from '@shopify/polaris'

function mapStateToProps(state) {
    return {
        page_tabs: state.page_tabs.tabs,
        current_page: state.page_tabs.current_page,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

class AppHeader extends Component {
    handleTabChange = (index) => {
        const { current_page, actions } = this.props

        if (index !== current_page) {
            actions.switchPagesAction(index)
        }
    }

    render() {
        const { page_tabs, current_page } = this.props

        return (
            <div className="app-header">
                <Page>
                    <div className="header-logo">
                        <div className="app-name">
                            <DisplayText size="small">
                                YouTube Gallery App
                            </DisplayText>
                        </div>
                        <div className="logo" />
                        <div className="actions">
                            <a>Request free installation</a>
                            <a>Need help?</a>
                        </div>
                    </div>
                    <div className="header-tabs-block">
                        <Tabs
                            tabs={page_tabs}
                            selected={current_page}
                            onSelect={(index) => this.handleTabChange(index)}
                        />
                    </div>
                </Page>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
