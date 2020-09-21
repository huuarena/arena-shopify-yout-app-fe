import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

function mapStateToProps(state) {
    return {
        widget_selected: state.widget_selected,
    };
}

class Logo extends Component {
    render() {
        const { widget_selected } = this.props;

        return (
            <div className="template-logo">
                <a
                    href={widget_selected.youtube_channel_source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        alt=""
                        src={widget_selected.youtube_channel.items[0].snippet.thumbnails.medium.url}
                    />
                </a>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Logo);
