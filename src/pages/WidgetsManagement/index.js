import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { DisplayText, Stack, Button, Card, Toast } from '@shopify/polaris';
import './styles.scss';
import formatDateTime from '../../utils/formatDateTime';
import Switch from 'react-switch';
import { getWidgets, updateWidgets } from '../../apis/yout_app';
import Preloader from '../../components/Preloader';
import ConfirmModal from '../../components/ConfirmModal';
import { CONFIG } from '../../config';
import {
    getCommentsByVideoIds,
    getYoutubeChannelInfo,
    getYoutubeVideosByIds,
} from '../../apis/youtube';
import { getYoutubeChannel, updateYoutubeChannel } from '../../apis/youtubeChannel';
import { getYoutubeVideos, updateYoutubeVideos } from '../../apis/youtubeVideos';
import { getYoutubeComments, updateYoutubeComments } from '../../apis/youtubeComments';

const INITIAL_STATE = {
    isReady: false,
    isLoading: false,
    toast: {
        show: false,
        content: '',
        error: false,
    },
    widgetDeleted: '',
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_api: state.youtube_api,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class WidgetsManagement extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    _getWidgets = async () => {
        const { actions } = this.props;

        const res = await getWidgets(CONFIG.STORE_NAME);
        if (res.success) {
            await actions.changeWidgetsAction(res.payload);
        }

        this.setState({ isReady: true });
    };

    componentDidMount() {
        this._getWidgets();
    }

    componentWillUnmount() {
        this.setState({ ...INITIAL_STATE });
    }

    renderWidgetWelcome = () => {
        const { redirectToPage, actions, widgets } = this.props;

        return (
            <Card.Section>
                <div className="widget-welcome">
                    <DisplayText size="extraLarge">Welcome to YouTube Gallery</DisplayText>
                    <DisplayText size="small">
                        Display YouTube channels and videos on your website.
                    </DisplayText>

                    <div className="action">
                        <DisplayText size="small">Let’s create your first widget!</DisplayText>
                    </div>

                    <Button
                        primary
                        onClick={async () => {
                            let newWidgets = { ...widgets };
                            newWidgets.selected = {};
                            await actions.changeWidgetsAction(newWidgets);
                            redirectToPage('WidgetsCreate');
                        }}
                    >
                        Create widget
                    </Button>
                </div>
            </Card.Section>
        );
    };

    handleChangeWidgetStatus = async (id) => {
        const { widgets, actions } = this.props;

        if (widgets.selected.id !== id) {
            let newWidgets = { ...widgets };

            widgets.data.forEach((element) => {
                if (element.id === id) {
                    newWidgets.selected = element;
                }
            });

            const data_stringify = JSON.stringify(newWidgets);
            const res = await updateWidgets(CONFIG.STORE_NAME, data_stringify);
            if (res.success) {
                this.setState({
                    toast: {
                        show: true,
                        content: 'Update widgets successfully!',
                        error: false,
                    },
                });
                actions.changeWidgetsAction(newWidgets);
            } else {
                this.setState({
                    toast: {
                        show: true,
                        content: 'Update widgets Failed. Retry',
                        error: true,
                    },
                });
            }
        }
    };

    handleRemove = async () => {
        this.setState({ isLoading: true });

        const { widgets, actions } = this.props;
        const { widgetDeleted } = this.state;

        let newData = [];
        widgets.data.forEach((element) => {
            if (element.id !== widgetDeleted) {
                newData.push(element);
            }
        });

        let newWidgets = {
            data: newData,
            selected: widgets.selected.id !== widgetDeleted ? widgets.selected : {},
        };

        const data_stringify = JSON.stringify(newWidgets);
        const res = await updateWidgets(CONFIG.STORE_NAME, data_stringify);
        if (res.success) {
            this.setState({
                toast: {
                    show: true,
                    content: 'Delete widget successfully!',
                    error: false,
                },
            });
            actions.changeWidgetsAction(newWidgets);
        } else {
            this.setState({
                toast: {
                    show: true,
                    content: 'Delete widget Failed. Retry',
                    error: true,
                },
            });
        }

        this.setState({ isLoading: false, widgetDeleted: '' });
    };

    renderTableBody = () => {
        const { widgets, actions, redirectToPage } = this.props;

        return (
            <tbody>
                {widgets.data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <div className="widget-name">{item.name}</div>
                        </td>
                        <td>
                            <Button size="slim" primary>
                                Install
                            </Button>
                        </td>
                        <td>{formatDateTime(item.updated_at, 'Month DD, YYYY')}</td>
                        <td>
                            <div className="btn-icon-group">
                                <div
                                    className="btn-icon"
                                    onClick={async () => {
                                        let newWidgets = { ...widgets };
                                        newWidgets.selected = item;
                                        await actions.changeWidgetsAction(newWidgets);
                                        redirectToPage('WidgetsCreate');
                                    }}
                                >
                                    <div className="icon icon-edit" />
                                    <div>Edit</div>
                                </div>
                                <div className="btn-icon">
                                    <div className="icon icon-copy" />
                                    <div>Duplicate</div>
                                </div>
                                <div
                                    className="btn-icon"
                                    onClick={() => this.setState({ widgetDeleted: item.id })}
                                >
                                    <div className="icon icon-delete" />
                                    <div>Remove</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <Stack wrap={false}>
                                <Switch
                                    height={20}
                                    width={46}
                                    onChange={() => this.handleChangeWidgetStatus(item.id)}
                                    checked={widgets.selected.id === item.id}
                                />
                                <div className="widget-status">
                                    {this.state.enabled ? 'On' : 'Off'}
                                </div>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    _getYoutubeChannel = async () => {
        const { actions } = this.props;

        const res = await getYoutubeChannel(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeChannelAction(res.payload);
        }
    };

    _getYoutubeVideos = async () => {
        const { actions } = this.props;

        const res = await getYoutubeVideos(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeVideosAction(res.payload);
        }
    };

    _getYoutubeComments = async () => {
        const { actions } = this.props;

        const res = await getYoutubeComments(CONFIG.STORE_NAME);
        if (res.success) {
            actions.changeYoutubeCommentsAction(res.payload);
        }
    };

    handleRefreshYoutubeData = async () => {
        this.setState({ isLoading: true });
        const { youtube_api, widgets } = this.props;

        // get youtube channel
        const data = {
            key: youtube_api.key,
            channelId: widgets.selected.template.source.channelId,
        };
        const res = await getYoutubeChannelInfo(data);
        if (res.success && res.payload.items.length) {
            let videoIds = [];
            res.payload.items.forEach((element) => {
                if (element.id.videoId) {
                    videoIds.push(element.id.videoId);
                }
            });

            if (videoIds.length) {
                // get youtube videos
                const data2 = {
                    key: youtube_api.key,
                    videoIds,
                };
                const res2 = await getYoutubeVideosByIds(data2);
                if (res2.success) {
                    // get youtube videos comments
                    let comments = [];
                    for (let i = 0; i < videoIds.length; i++) {
                        const data3 = {
                            key: youtube_api.key,
                            videoId: videoIds[i],
                        };
                        const res3 = await getCommentsByVideoIds(data3);
                        if (res3.success) {
                            let newComment = res3.payload;
                            newComment.videoId = videoIds[i];
                            comments.push(newComment);
                        }
                    }

                    // update db
                    const data_stringify_channel = JSON.stringify(res.payload)
                        .replaceAll("'", '')
                        .replaceAll('--', '__');
                    const res4 = await updateYoutubeChannel(
                        CONFIG.STORE_NAME,
                        data_stringify_channel,
                    );
                    if (res4.success) {
                        const data_stringify_videos = JSON.stringify(res2.payload)
                            .replaceAll("'", '')
                            .replaceAll('--', '__');
                        const res5 = await updateYoutubeVideos(
                            CONFIG.STORE_NAME,
                            data_stringify_videos,
                        );
                        if (res5.success) {
                            const data_stringify_comments = JSON.stringify(comments)
                                .replaceAll("'", '')
                                .replaceAll('--', '__');
                            const res6 = await updateYoutubeComments(
                                CONFIG.STORE_NAME,
                                data_stringify_comments,
                            );
                            if (res6.success) {
                                // refresh store
                                this._getYoutubeChannel();
                                this._getYoutubeVideos();
                                this._getYoutubeComments();

                                return this.setState({
                                    toast: {
                                        show: true,
                                        content: 'Refresh youtube data successfully',
                                        error: false,
                                    },
                                    isLoading: false,
                                });
                            }
                        }
                    }
                } else {
                    return this.setState({
                        toast: {
                            show: true,
                            content: 'Get youtube videos failed',
                            error: true,
                        },
                        isLoading: false,
                    });
                }
            }
        } else {
            return this.setState({
                toast: {
                    show: true,
                    content: 'Get youtube channel failed',
                    error: true,
                },
                isLoading: false,
            });
        }

        return this.setState({
            toast: {
                show: true,
                content: 'Refresh youtube data failed',
                error: true,
            },
            isLoading: false,
        });
    };

    renderWidgetsTable = () => {
        const { widgets, actions, redirectToPage } = this.props;

        return (
            <Card.Section>
                <div className="title">
                    <Stack distribution="equalSpacing" alignment="center">
                        <Stack.Item fill>
                            <Stack alignment="center">
                                <DisplayText>Widgets</DisplayText>
                                <Button
                                    primary
                                    size="slim"
                                    onClick={async () => {
                                        let newWidgets = { ...widgets };
                                        newWidgets.selected = {};
                                        await actions.changeWidgetsAction(newWidgets);
                                        redirectToPage('WidgetsCreate');
                                    }}
                                >
                                    Create widget
                                </Button>
                            </Stack>
                        </Stack.Item>
                        <Stack.Item>
                            <Button size="slim" onClick={() => this.handleRefreshYoutubeData()}>
                                Refresh Youtube Videos
                            </Button>
                        </Stack.Item>
                    </Stack>
                </div>

                <div className="subtitle">
                    Create, edit or remove your widgets. Press install to place them on the required
                    page.
                </div>

                <div className="table-block">
                    <table>
                        <thead className="">
                            <tr>
                                <th>NAME</th>
                                <th>INSTALLATION</th>
                                <th>LAST UPDATED</th>
                                <th>ACTIONS</th>
                                <th>ENABLED</th>
                            </tr>
                        </thead>

                        {this.renderTableBody()}
                    </table>
                </div>
            </Card.Section>
        );
    };

    render() {
        const { widgets } = this.props;
        const { isReady, toast, isLoading, widgetDeleted } = this.state;

        return isReady ? (
            <div className="widgets-management">
                {isLoading && <Preloader />}

                {widgets.data.length > 0 ? this.renderWidgetsTable() : this.renderWidgetWelcome()}

                {toast.show && (
                    <Toast
                        content={toast.content}
                        error={toast.error}
                        onDismiss={() =>
                            this.setState({ toast: { show: false, content: '', error: false } })
                        }
                    />
                )}

                {widgetDeleted && (
                    <ConfirmModal
                        title="Confirm delete this widget?"
                        content="Are you sure delete this widget?"
                        onClose={() => this.setState({ widgetDeleted: '' })}
                        onCancel={() => this.setState({ widgetDeleted: '' })}
                        onConfirm={() => this.handleRemove()}
                    />
                )}
            </div>
        ) : (
            <Preloader />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsManagement);
