import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { getYoutApp } from '../../apis/yout_app';

const INITIAL_STATE = {
    isReady: false,
};

function mapStateToProps(state) {
    return {
        store: state,
        yout_app: state.yout_app,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        const { yout_app } = props;

        if (JSON.stringify(yout_app.youtube_api) !== '{}') {
            return { isReady: true };
        }

        return null;
    }

    _getYoutApp = async () => {
        const { actions } = this.props;

        const res = await getYoutApp();
        if (res.success) {
            console.log('1');
            await actions.changeYoutAppAction(res.payload);
            console.log('2');
            this.setState({ isReady: true });
            console.log('3');
        }
    };

    componentDidMount() {
        const { isReady } = this.state;

        if (!isReady) {
            this._getYoutApp();
        }
    }

    render() {
        console.log('this.props :>> ', this.props);
        return <div>App Main</div>;
    }
}

export default connect(mapStateToProps)(AppMain);
