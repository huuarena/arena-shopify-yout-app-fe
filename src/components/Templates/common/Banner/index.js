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

        const layoutIndex = widgets.selected.template.layout.header.layout.selected;
        const layoutName = widgets.selected.template.layout.header.layout.data[
            layoutIndex
        ].toLowerCase();

        return (
            widgets.selected.template.layout.header.elements.banner.show && (
                <div className={`template-banner template-banner-${layoutName}`}>
                    <img alt="" src={widgets.selected.template.layout.header.elements.banner.url} />
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(Banner);
