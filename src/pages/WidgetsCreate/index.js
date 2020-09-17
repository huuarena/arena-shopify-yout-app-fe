import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import './styles.scss';
import Sidebar from 'react-sidebar';
import { Button, DisplayText, Card, TextField, Icon, Stack, Toast } from '@shopify/polaris';
import {
    ChevronLeftMinor,
    ArrowRightMinor,
    SettingsMajorMonotone,
    ChevronRightMinor,
} from '@shopify/polaris-icons';
import TemplateCustom from '../../components/TemplateCustom';
import Templates from '../../components/Templates';
import Preloader from '../../components/Preloader';
import { updateWidgets } from '../../apis/widgets';
import { templates } from '../../variables';
import { CONFIG } from '../../config';
import { getYoutubeChannel } from '../../apis/youtubeChannel';
import { getYoutubeVideos } from '../../apis/youtubeVideos';

let INITIAL_WIDGET = {
    id: '',
    name: '',
    created_at: '',
    updated_at: '',
    enabled: false,
    template: {},
};

const INITIAL_STATE = {
    isReady: false,
    isLoading: false,
    openSidebar: false,
    openTemplateCustom: false,
    toast: {
        show: false,
        content: '',
        error: false,
    },
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        youtube_channel: state.youtube_channel,
        youtube_videos: state.youtube_videos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class WidgetsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (
            JSON.stringify(props.widgets.selected) !== '{}' &&
            JSON.stringify(props.youtube_channel) !== '{}'
        ) {
            return { isReady: true };
        }

        return null;
    }

    initWidgetSelected = () => {
        const { widgets, actions } = this.props;

        let newWidgets = { ...widgets };

        // init new widget
        newWidgets.selected = { ...INITIAL_WIDGET };
        newWidgets.selected.id = `widget-${new Date().getTime()}`;
        newWidgets.selected.name = `Widget-${new Date().getTime()}`;
        newWidgets.selected.created_at = new Date().getTime();
        newWidgets.selected.updated_at = new Date().getTime();

        actions.changeWidgetsAction(newWidgets);
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

    componentDidMount() {
        const { widgets, youtube_channel, youtube_videos } = this.props;
        const { isReady } = this.state;

        if (!isReady) {
            if (JSON.stringify(widgets.selected) === '{}') {
                this.initWidgetSelected();
            }

            if (JSON.stringify(youtube_channel) === '{}') {
                this._getYoutubeChannel();
            }

            if (JSON.stringify(youtube_videos) === '{}') {
                this._getYoutubeVideos();
            }
        }
    }

    componentWillUnmount() {
        this.setState({ ...INITIAL_STATE });
    }

    renderLeftContent = () => {
        const { widgets, actions } = this.props;
        const { openTemplateCustom } = this.state;

        return openTemplateCustom ? (
            <TemplateCustom />
        ) : (
            <div className="cards-select">
                <div>
                    <div className="title">
                        <DisplayText size="small">Select a template to start with</DisplayText>
                    </div>

                    <div className="cards-block">
                        {templates.map((item) => (
                            <div
                                key={item.id}
                                className={`widget-card${
                                    widgets.selected.template.id === item.id
                                        ? ` widget-card-selected`
                                        : ``
                                }`}
                                onClick={() => {
                                    if (widgets.selected.template.id !== item.id) {
                                        let newWidgets = { ...widgets };
                                        newWidgets.selected.template = item;
                                        actions.changeWidgetsAction(newWidgets);
                                    }
                                }}
                            >
                                <div className="widget-card-body">
                                    <img alt={item.label} src={item.avatar} />
                                    <div className="widget-card-label">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-actions">
                    <button
                        onClick={() => {
                            if (Object.keys(widgets.selected.template).length > 0) {
                                this.setState({ openTemplateCustom: true });
                            } else {
                                this.setState({
                                    toast: {
                                        show: true,
                                        content: 'You need to select template first',
                                        error: false,
                                    },
                                });
                            }
                        }}
                    >
                        <div className="button-label">Continue with this template</div>
                        <Icon source={ArrowRightMinor} color="white" />
                    </button>
                </div>
            </div>
        );
    };

    indexOfWidgetExists = (array, item) => {
        if (!array.length) {
            return -1;
        }

        for (let i = 0; i < array.length; i++) {
            if (array[i].id === item.id) {
                return i;
            }
        }

        return -1;
    };

    handleSaveWidgets = async () => {
        this.setState({ isLoading: true });

        const { actions, widgets } = this.props;

        if (!Object.keys(widgets.selected.template).length) {
            this.setState({
                toast: {
                    show: true,
                    content: 'You need to select template first',
                    error: true,
                },
                isLoading: false,
            });
            return;
        }

        let newWidgets = { ...widgets };

        let index = this.indexOfWidgetExists(widgets.data, widgets.selected);
        if (index >= 0) {
            newWidgets.data[index] = widgets.selected;
        } else {
            newWidgets.data.push(widgets.selected);
        }

        const data_stringfy = JSON.stringify(newWidgets);
        const res = await updateWidgets(CONFIG.STORE_NAME, data_stringfy);
        if (res.success) {
            this.setState({
                toast: {
                    show: true,
                    content:
                        index >= 0 ? 'Update widget successfully!' : 'Create widget successfully!',
                    error: false,
                },
            });
            await actions.changeWidgetsAction(newWidgets);

            // setTimeout(() => {
            //     redirectToPage('WidgetsManagement');
            // }, 1000);
        } else {
            this.setState({
                toast: {
                    show: true,
                    content: 'Create widgets Failed. Retry',
                    error: true,
                },
            });
        }

        this.setState({ isLoading: false });
    };

    render() {
        const { redirectToPage, actions, widgets } = this.props;
        const { openSidebar, toast, isReady, isLoading } = this.state;

        return isReady ? (
            <div className="widget-create">
                {isLoading && <Preloader />}

                <Card.Section>
                    <div className="page-breadcrumbs">
                        <Button
                            plain
                            icon={ChevronLeftMinor}
                            size="slim"
                            onClick={() => {
                                actions.changeWidgetsAction({ data: [], selected: {} });
                                redirectToPage('WidgetsManagement');
                            }}
                        >
                            <div className="page-breadcrumbs-label">Back to list</div>
                        </Button>
                    </div>

                    <DisplayText>Create Widget</DisplayText>

                    <div className="page-subtitle">
                        Configure and save your widget. And then install it.
                    </div>
                </Card.Section>

                <Card.Section>
                    <div className="section-title">
                        <DisplayText size="small">Widget name</DisplayText>
                    </div>

                    <TextField
                        autoFocus
                        placeholder="Widget name"
                        type="Text"
                        value={widgets.selected.name}
                        onChange={(value) => {
                            let newWidgets = { ...widgets };
                            newWidgets.selected.name = value;
                            actions.changeWidgetsAction(newWidgets);
                        }}
                        helpText="Name your widget. The name will be displayed only in your admin panel."
                        error={widgets.selected.name ? false : 'Widget name is required'}
                    />
                </Card.Section>

                <Card.Section>
                    <div className="section-title">
                        <DisplayText size="small">Adjust settings</DisplayText>
                    </div>

                    {/* Mobile section */}
                    <div
                        className="mobile-section-title"
                        onClick={() => this.setState({ openSidebar: !openSidebar })}
                    >
                        <div className="title">
                            <div className="btn-icon">
                                {openSidebar ? (
                                    <Icon source={ChevronLeftMinor} color="white" />
                                ) : (
                                    <Icon source={SettingsMajorMonotone} color="white" />
                                )}
                            </div>
                            <div className="subtitle">
                                {openSidebar ? 'Back to preview' : 'Wiget Settings'}
                            </div>
                        </div>
                        <div className="btn-icon">
                            {!openSidebar && <Icon source={ChevronRightMinor} color="white" />}
                        </div>
                    </div>

                    {/* Desktop section */}
                    <div className="widget-create-body">
                        <div className="left-content">{this.renderLeftContent()}</div>
                        <div className="right-content">
                            <div className="preview-block">
                                <Templates />
                            </div>
                        </div>

                        <div className={`sidebar sidebar-${openSidebar ? 'open' : 'hidden'}`}>
                            <Sidebar
                                sidebar={this.renderLeftContent()}
                                open={openSidebar}
                                onSetOpen={() => this.setState({ openSidebar: !openSidebar })}
                            >
                                <div></div>
                            </Sidebar>
                        </div>
                    </div>
                </Card.Section>

                <Card.Section>
                    <Stack distribution="trailing">
                        <Button
                            onClick={() => {
                                let newWidgets = { ...widgets };
                                newWidgets.selected = {};
                                actions.changeWidgetsAction(newWidgets);
                                redirectToPage('WidgetsManagement');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button primary onClick={() => this.handleSaveWidgets()}>
                            Save and Exit
                        </Button>
                    </Stack>
                </Card.Section>

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
        ) : (
            <Preloader />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsCreate);
