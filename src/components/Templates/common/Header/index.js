import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatLongNumber from '../../../../utils/formatLongNumber';
import Logo from '../Logo';
import SubscribeButton from '../SubscribeButton';

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
    };
}

class Header extends Component {
    renderStatistics = () => {
        const { widget_selected } = this.props;

        return (
            <div className="information-counter">
                {widget_selected.setting.layout.header.elements.subscribers_counter.show && (
                    <div>
                        {formatLongNumber(
                            widget_selected.setting.layout.header.elements.subscribers_counter
                                .value,
                        )}{' '}
                        Subscribers
                    </div>
                )}

                {widget_selected.setting.layout.header.elements.subscribers_counter.show &&
                    widget_selected.setting.layout.header.elements.videos_counter.show && (
                        <div className="divider" />
                    )}

                {widget_selected.setting.layout.header.elements.videos_counter.show && (
                    <div>
                        {formatLongNumber(
                            widget_selected.setting.layout.header.elements.videos_counter.value,
                        )}{' '}
                        Videos
                    </div>
                )}

                {((widget_selected.setting.layout.header.elements.videos_counter.show &&
                    widget_selected.setting.layout.header.elements.views_counter.show) ||
                    (widget_selected.setting.layout.header.elements.subscribers_counter.show &&
                        widget_selected.setting.layout.header.elements.views_counter.show)) && (
                    <div className="divider" />
                )}

                {widget_selected.setting.layout.header.elements.views_counter.show && (
                    <div>
                        {formatLongNumber(
                            widget_selected.setting.layout.header.elements.views_counter.value,
                        )}{' '}
                        Views
                    </div>
                )}
            </div>
        );
    };

    render() {
        const { widget_selected } = this.props;

        const layoutIndex = widget_selected.setting.layout.header.layout.selected;
        const layoutName = widget_selected.setting.layout.header.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            <div className={`template-header  template-header-${layoutName}`}>
                {widget_selected.setting.layout.header.elements.logo.show && <Logo />}
                <div className="header-information">
                    {widget_selected.setting.layout.header.elements.channel_name.show && (
                        <div className="template-channel-name">
                            <a
                                href={widget_selected.youtube_channel_source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {widget_selected.youtube_channel_custom.channel_name ||
                                    widget_selected.youtube_channel.items[0].snippet.title}
                            </a>
                        </div>
                    )}
                    {this.renderStatistics()}
                    {widget_selected.setting.layout.header.elements.channel_description.show && (
                        <div className="template-channel-description">
                            {widget_selected.youtube_channel_custom.channel_description ||
                                widget_selected.youtube_channel.items[0].snippet.description}
                        </div>
                    )}
                </div>
                <div className="header-subscribe-button">
                    {widget_selected.setting.layout.header.elements.subcribe_button.show && (
                        <SubscribeButton />
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);
