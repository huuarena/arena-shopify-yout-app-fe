import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatLongNumber from '../../../../utils/formatLongNumber';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class SubscribeButton extends Component {
    render() {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.subcribe_button.show && (
                <div className="template-subscribe-button">
                    <div className="youtube-logo">
                        <div className="youtube-icon" />
                        <div>Youtube</div>
                    </div>
                    <div className="subscribers-counter">
                        {formatLongNumber(
                            widgets.selected.template.layout.header.elements.subscribers_counter
                                .value,
                        )}
                    </div>
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(SubscribeButton);
