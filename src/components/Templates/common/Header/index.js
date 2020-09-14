import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatLongNumber } from '../../../../utils/formatLongNumber';
import ChannelDescription from '../ChannelDescription';
import ChannelName from '../ChannelName';
import Logo from '../Logo';
import SubscribeButton from '../SubscribeButton';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class Header extends Component {
    renderSubscribersCounter = () => {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.subscribers_counter.show && (
                <div className="subscribers-counter">
                    {formatLongNumber(
                        widgets.selected.template.layout.header.elements.subscribers_counter.value,
                    )}{' '}
                    Subscribers
                </div>
            )
        );
    };

    renderVideosCounter = () => {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.videos_counter.show && (
                <div className="videos-counter">
                    <div className="divider" />
                    {formatLongNumber(
                        widgets.selected.template.layout.header.elements.videos_counter.value,
                    )}{' '}
                    Videos
                </div>
            )
        );
    };

    renderViewsCounter = () => {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.views_counter.show && (
                <div className="views-counter">
                    <div className="divider" />
                    {formatLongNumber(
                        widgets.selected.template.layout.header.elements.views_counter.value,
                    )}{' '}
                    Views
                </div>
            )
        );
    };

    render() {
        return (
            <div className="template-header">
                <div className="header-logo">
                    <Logo />
                </div>
                <div className="header-information">
                    <ChannelName />
                    <div className="information-counter">
                        {this.renderSubscribersCounter()}
                        {this.renderVideosCounter()}
                        {this.renderViewsCounter()}
                    </div>
                    <ChannelDescription />
                </div>
                <div className="header-subscribe-button">
                    <SubscribeButton />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);
