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
import TemplateCustom from '../../components/YoutApp/TemplateCustom';
import Preloader from '../../components/YoutApp/Preloader';
import { updateYoutApp } from '../../apis/yout_app';
import widget_demo from '../../variables/widget_demo';
import settings from '../../variables/settings';
import Templates from '../../components/YoutApp/Templates';

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
        yout_app: state.yout_app,
        widget_selected: state.widget_selected,
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
        const { widget_selected } = props;

        if (JSON.stringify(widget_selected) !== '{}') {
            return { isReady: true };
        }

        return null;
    }

    componentDidMount() {
        const { actions } = this.props;
        const { isReady } = this.state;

        if (!isReady) {
            // init new widget
            let newWidget = { ...widget_demo };
            newWidget.id = `${Math.random().toString(36).substring(2)}-${Math.random()
                .toString(36)
                .substring(2)}-${new Date().getTime()}`;
            newWidget.name = `widget-${new Date().getTime()}`;
            newWidget.created_at = new Date().getTime();
            newWidget.updated_at = new Date().getTime();

            actions.changeWidgetSelectedAction(newWidget);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        const { isReady } = this.state;

        if (!isReady) {
            actions.changeWidgetSelectedAction({});
        }
    }

    renderLeftContent = () => {
        const { widget_selected, actions } = this.props;
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
                        {settings.map((item) => (
                            <div
                                key={item.id}
                                className={`widget-card${
                                    JSON.stringify(widget_selected.setting) !== '{}' &&
                                    widget_selected.setting.id === item.id
                                        ? ` widget-card-selected`
                                        : ``
                                }`}
                                onClick={() => {
                                    if (
                                        JSON.stringify(widget_selected.setting) === '{}' ||
                                        widget_selected.setting.id !== item.id
                                    ) {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting = item;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }
                                }}
                            >
                                <div className="widget-card-body">
                                    <img alt={item.label} src={item.banner} />
                                    <div className="widget-card-label">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-actions">
                    <button
                        onClick={() => {
                            if (JSON.stringify(widget_selected.setting) !== '{}') {
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

        const { actions, yout_app, widget_selected } = this.props;

        if (JSON.stringify(widget_selected.setting) === '{}') {
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

        let newWidgets = [...yout_app.widgets];

        const index = this.indexOfWidgetExists(yout_app.widgets, widget_selected);

        // const div = document.getElementById(widget_selected.id);

        if (index >= 0) {
            newWidgets[index] = widget_selected;
        } else {
            newWidgets.push(widget_selected);
        }

        const data_stringify = JSON.stringify(newWidgets);
        const res = await updateYoutApp('widgets', data_stringify);
        console.log('updateYoutApp res :>> ', res);
        if (res.success) {
            this.setState({
                toast: {
                    show: true,
                    content:
                        index >= 0 ? 'Update widget successfully!' : 'Create widget successfully!',
                    error: false,
                },
                isLoading: false,
            });
            await actions.changeYoutAppWidgetsAction(newWidgets);

            // setTimeout(() => {
            //     redirectToPage('WidgetsManagement');
            // }, 1000);
        } else {
            this.setState({
                toast: {
                    show: true,
                    content:
                        index >= 0
                            ? 'Update widgets Failed. Retry!'
                            : 'Update widgets Failed. Retry!',
                    error: true,
                },
                isLoading: false,
            });
        }
    };

    render() {
        const { redirectToPage, actions, widget_selected } = this.props;
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
                            onClick={async () => redirectToPage('WidgetsManagement')}
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
                        value={widget_selected.name}
                        onChange={(value) => {
                            let newWidget = { ...widget_selected };
                            newWidget.name = value;
                            actions.changeWidgetSelectedAction(newWidget);
                        }}
                        helpText="Name your widget. The name will be displayed only in your admin panel."
                        error={widget_selected.name ? false : 'Widget name is required'}
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
                        <Button onClick={async () => redirectToPage('WidgetsManagement')}>
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
