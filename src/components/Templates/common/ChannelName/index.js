import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class ChannelName extends Component {
    render() {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.channel_name.show && (
                <div className="template-channel-name">
                    <a
                        href={widgets.selected.template.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {widgets.selected.template.layout.header.elements.channel_name.value}
                    </a>
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(ChannelName);
