import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

class Banner extends Component {
    render() {
        const { widgets } = this.props;

        return (
            widgets.selected.template.layout.header.elements.banner.show && (
                <div className="template-banner">
                    <img alt="" src={widgets.selected.template.layout.header.elements.banner.url} />
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(Banner);
