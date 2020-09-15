import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class ChannelDescription extends Component {
    render() {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.channel_description.show && (
                <div className="template-channel-description">
                    {widgets.selected.template.layout.header.elements.channel_description.value}
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(ChannelDescription);
