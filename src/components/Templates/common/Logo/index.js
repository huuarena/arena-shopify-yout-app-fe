import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class Logo extends Component {
    render() {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.logo.show && (
                <div className="template-logo">
                    <a
                        href={widgets.selected.template.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt=""
                            src={widgets.selected.template.layout.header.elements.logo.url}
                        />
                    </a>
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(Logo);
