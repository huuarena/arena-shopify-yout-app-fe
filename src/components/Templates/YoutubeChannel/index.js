import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widgetSelected: state.widgets.selected,
    };
}

// function mapDispatchToProps(dispatch) {
//     return {};
// }

class YoutubeChannel extends Component {
    renderLogo = () => {
        const { template } = this.props.widgetSelected;

        return <div></div>;
    };

    renderBanner = () => {
        const { template } = this.props.widgetSelected;

        return template.layout.header.elements.banner.show ? (
            <div className="banner">
                <img alt="" src={template.layout.header.elements.banner.url} />
            </div>
        ) : (
            <div></div>
        );
    };

    renderChannelName = () => {
        return <div></div>;
    };

    renderChannelDescription = () => {
        return <div></div>;
    };

    renderVideosCounter = () => {
        return <div></div>;
    };

    renderSubscribersCounter = () => {
        return <div></div>;
    };

    renderViewsCounter = () => {
        return <div></div>;
    };

    renderSubscribeButton = () => {
        return <div></div>;
    };

    renderHeader = () => {
        return <div></div>;
    };

    renderLayout = () => {
        return <div></div>;
    };

    render() {
        return <div className="youtube-channel">{this.renderBanner()}</div>;
    }
}

export default connect(mapStateToProps)(YoutubeChannel);
