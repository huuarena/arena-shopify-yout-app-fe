import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import './styles.scss';
import Sidebar from 'react-sidebar';
import { Button, DisplayText, Card, TextField, Icon, Stack, Toast } from '@shopify/polaris';
import {
    ChevronLeftMinor,
    ArrowRightMinor,
    SettingsMajorMonotone,
    ChevronRightMinor,
} from '@shopify/polaris-icons';
import TemplateCustom from '../TemplateCustom';
import Templates from '../Templates';
import { getTemplates } from './../../apis/templates';
import Preloader from '../common/Preloader';
import { updateWidgets } from '../../apis/widgets';

const INITIAL_WIDGET = {
    id: `widget-${new Date().getTime()}`,
    name: `Widget-${new Date().getTime()}`,
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
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
        templates: state.templates,
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
        if (Object.keys(props.widgets.selected).length > 0 && props.templates.length > 0) {
            return { isReady: true };
        }

        return null;
    }

    _getTemplates = async () => {
        const { actions } = this.props;

        const res = await getTemplates();
        if (res.success) {
            actions.changeTemplatesAction(res.payload);
        }
    };

    componentDidMount() {
        const { widgets, actions } = this.props;
        const { isReady } = this.state;

        if (!isReady) {
            this._getTemplates();
        }

        if (JSON.stringify(widgets.selected) === '{}') {
            let newWidgets = { ...widgets };
            newWidgets.selected = { ...INITIAL_WIDGET };
            actions.changeWidgetsAction(newWidgets);
        }
    }

    renderLeftContent = () => {
        const { widgets, templates, actions } = this.props;
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
                        {templates.length > 0 &&
                            templates.map(item => (
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

        const { actions, widgets, redirectToPage } = this.props;

        let newWidgets = { ...widgets };

        let index = this.indexOfWidgetExists(widgets.data, widgets.selected);
        if (index >= 0) {
            newWidgets.data[index] = widgets.selected;
        } else {
            newWidgets.data.push(widgets.selected);
        }

        const data_stringfy = JSON.stringify(newWidgets);
        const res = await updateWidgets(data_stringfy);
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
            setTimeout(() => {
                redirectToPage('WidgetsManagement');
            }, 1000);
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
                        onChange={value => {
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
                                <Icon source={SettingsMajorMonotone} color="white" />
                            </div>
                            <div>Wiget Setting</div>
                        </div>
                        <div className="btn-icon">
                            <Icon source={ChevronRightMinor} color="white" />
                        </div>
                    </div>

                    {/* Desktop section */}
                    <div className="widget-create-body">
                        <div className="left-content">{this.renderLeftContent()}</div>
                        <div className="right-content">{/* <Templates /> */}</div>

                        <div className="sidebar">
                            <Sidebar
                                sidebar={<div>{this.renderLeftContent()}</div>}
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
