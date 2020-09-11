import React, { Component } from 'react';
import { connect } from 'react-redux';
import YoutubeChannel from './YoutubeChannel';
import VideoGrid from './VideoGrid';

function mapStateToProps(state) {
    return {
        widgetSelected: state.widgets.selected,
        templates: state.templates,
    };
}

// function mapDispatchToProps(dispatch) {
//     return {};
// }

class Templates extends Component {
    render() {
        const { widgetSelected, templates } = this.props;

        console.log('Templates props widgetSelected :>> ', widgetSelected);

        if (Object.keys(widgetSelected).length > 0) {
            switch (widgetSelected.id) {
                case templates[0].id:
                    return <YoutubeChannel />;

                case templates[1].id:
                    return <VideoGrid />;

                default:
                    return <YoutubeChannel />;
            }
        }

        return <div></div>;
    }
}

export default connect(mapStateToProps)(Templates);
