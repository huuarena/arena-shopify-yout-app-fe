import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatLongNumber from '../../../../../utils/formatLongNumber';
import './styles.scss';

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
    };
}

class SubscribeButton extends Component {
    render() {
        const { widget_selected } = this.props;

        return (
            <div className="template-subscribe-button">
                <div className="youtube-logo">
                    <div className="youtube-icon" />
                    <div>Youtube</div>
                </div>
                <div className="subscribers-counter">
                    {formatLongNumber(
                        widget_selected.youtube_channel.items[0].statistics.subscriberCount,
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SubscribeButton);
