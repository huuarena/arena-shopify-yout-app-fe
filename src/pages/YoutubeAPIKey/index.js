import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import { Button, TextField, Toast } from '@shopify/polaris';
import './styles.scss';
import Preloader from '../../components/YoutApp/Preloader';
import { updateYoutApp } from './../../apis/yout_app';

const INITIAL_STATE = {
    isReady: true,
    youtubeApiKey: {
        value: '',
        errMsg: '',
    },
    toast: {
        show: false,
        content: '',
        error: false,
    },
};

function mapStateToProps(state) {
    return {
        yout_app: state.yout_app,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class YoutubeAPIKey extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        const { yout_app } = props;

        if (JSON.stringify(yout_app.youtube_api) !== '{}') {
            return { youtubeApiKey: { value: yout_app.youtube_api.key, errMsg: '' } };
        }

        return null;
    }

    handleSubmit = async () => {
        this.setState({ isReady: false });

        const { actions } = this.props;

        let formValid = true;
        let data = {};

        // validate youtubeApiKey
        const key = this.state.youtubeApiKey.value;
        if (!key) {
            formValid = false;
            this.setState({
                youtubeApiKey: {
                    value: '',
                    errMsg: 'Youtube API Key is required',
                },
            });
        } else {
            data = { ...data, key };
        }

        // submit
        if (formValid) {
            const data_stringify = JSON.stringify(data);
            const res = await updateYoutApp('youtube_api', data_stringify);
            console.log('updateYoutApp res :>> ', res);
            if (res.success) {
                await actions.changeYoutAppYoutubeApiAction(data);
                this.setState({
                    toast: {
                        show: true,
                        content: 'Set your Youtube API Key successfully',
                        error: false,
                    },
                });
                setTimeout(() => {
                    actions.switchPagesAction(0);
                }, 1000);
            } else {
                this.setState({
                    toast: { show: true, content: res.error.message, error: true },
                });
            }
        } else {
            this.setState({
                toast: { show: true, content: 'Invalid form information', error: true },
            });
        }

        this.setState({ isReady: true });
    };

    render() {
        const { youtubeApiKey, isReady, toast } = this.state;

        return (
            <div className="youtube-api-key">
                {isReady || <Preloader />}

                <div className="form-control title">Set your Youtube API Key</div>

                <div className="form-control subtitle">
                    You have to create your own Youtube API Key to use Yout App widget
                </div>

                <div className="form-control subtitle">
                    The follow tutorial explains the easy steps tp get yout Youtube API Key
                </div>

                <div className="form-control create-youtube-api">
                    <a href="/#" target="_blank" rel="noopener noreferrer">
                        How to get Youtube API Key
                    </a>
                </div>

                <div className="form-control">
                    <TextField
                        autoFocus
                        value={youtubeApiKey.value}
                        onChange={(value) =>
                            this.setState({ youtubeApiKey: { value, errMsg: '' } })
                        }
                        error={youtubeApiKey.errMsg}
                    />
                </div>

                <div className="form-submit">
                    <Button primary onClick={() => this.handleSubmit()}>
                        Save API Key
                    </Button>
                </div>

                {toast.show && (
                    <Toast
                        content={toast.content}
                        error={toast.error}
                        onDismiss={() =>
                            this.setState({ toast: { show: false, content: '', error: false } })
                        }
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeAPIKey);
