import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
    };
}

class Banner extends Component {
    render() {
        const { widget_selected } = this.props;

        const layoutIndex = widget_selected.setting.layout.header.layout.selected;
        const layoutName = widget_selected.setting.layout.header.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            <div className={`template-banner template-banner-${layoutName}`}>
                <img
                    alt=""
                    src={
                        widget_selected.youtube_channel.items[0].brandingSettings.image
                            .bannerImageUrl
                    }
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Banner);
