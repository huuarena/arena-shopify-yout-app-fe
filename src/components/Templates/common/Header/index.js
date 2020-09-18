import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatLongNumber from '../../../../utils/formatLongNumber';
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
    renderStatistics = () => {
        const { widgets } = this.props;
        return (
            <div className="information-counter">
                {widgets.selected.template.layout.header.elements.subscribers_counter.show && (
                    <div>
                        {formatLongNumber(
                            widgets.selected.template.layout.header.elements.subscribers_counter
                                .value,
                        )}{' '}
                        Subscribers
                    </div>
                )}

                {widgets.selected.template.layout.header.elements.subscribers_counter.show &&
                    widgets.selected.template.layout.header.elements.videos_counter.show && (
                        <div className="divider" />
                    )}

                {widgets.selected.template.layout.header.elements.videos_counter.show && (
                    <div>
                        {formatLongNumber(
                            widgets.selected.template.layout.header.elements.videos_counter.value,
                        )}{' '}
                        Videos
                    </div>
                )}

                {((widgets.selected.template.layout.header.elements.videos_counter.show &&
                    widgets.selected.template.layout.header.elements.views_counter.show) ||
                    (widgets.selected.template.layout.header.elements.subscribers_counter.show &&
                        widgets.selected.template.layout.header.elements.views_counter.show)) && (
                    <div className="divider" />
                )}

                {widgets.selected.template.layout.header.elements.views_counter.show && (
                    <div>
                        {formatLongNumber(
                            widgets.selected.template.layout.header.elements.views_counter.value,
                        )}{' '}
                        Views
                    </div>
                )}
            </div>
        );
    };

    render() {
        const { widgets } = this.props;

        const layoutIndex = widgets.selected.template.layout.header.layout.selected;
        const layoutName = widgets.selected.template.layout.header.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            <div className={`template-header  template-header-${layoutName}`}>
                <Logo />
                <div className="header-information">
                    <ChannelName />
                    {this.renderStatistics()}
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
