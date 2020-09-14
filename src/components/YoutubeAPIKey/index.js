import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayText } from '@shopify/polaris';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class YoutubeAPIKey extends Component {
    render() {
        return (
            <div>
                <DisplayText size="small"></DisplayText>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(YoutubeAPIKey);