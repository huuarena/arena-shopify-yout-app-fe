import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import './styles.scss';
import Sidebar from 'react-sidebar';
import { Button, DisplayText, Card, TextField, Icon, Stack, Toast } from '@shopify/polaris';
import { ChevronLeftMinor, ArrowRightMinor, SettingsMajorMonotone, ChevronRightMinor } from '@shopify/polaris-icons';
import formatDateTime from '../../utils/formatDateTime';
import TemplateCustom from '../TemplateCustom';
import Templates from '../Templates';

const INITIAL_WIDGET = {
    id: `widget-${new Date().getTime()}`,
    name: `Widget - ${formatDateTime(new Date().getTime(), 'Month DD, YYYY')}`,
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    enabled: false,
    template: {},
};

const INITIAL_STATE = {
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
        if (Object.keys(props.widgets.selected).length > 0 && props.widgets.selected.id !== state.widgetSelected.id) {
            return {
                widgetSelected: props.widgets.selected,
            };
        }

        return null;
    }

    renderLeftContent = () => {
        const { templates, actions } = this.props;
        const { widgetSelected, openTemplateCustom } = this.state;

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
                                        widgetSelected.template.id === item.id ? ` widget-card-selected` : ``
                                    }`}
                                    onClick={() => {
                                        actions.editWidgetAction(widgetSelected);
                                        let newWidgetSelected = { ...widgetSelected };
                                        newWidgetSelected.template = item;
                                        this.setState({ widgetSelected: newWidgetSelected });
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
                            if (Object.keys(widgetSelected.template).length > 0) {
                                actions.editWidgetAction(widgetSelected);
                                this.setState({ openTemplateCustom: true });
                            } else {
                                this.setState({
                                    toast: { show: true, content: 'You need to select template first', error: false },
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

    render() {
        const { redirectToPage, actions } = this.props;
        const { openSidebar, widgetSelected, toast } = this.state;

        console.log('WidgetCreate state widgetSelected :>> ', widgetSelected);

        return (
            <div className="widget-create">
                <Card.Section>
                    <div className="page-breadcrumbs">
                        <Button
                            plain
                            icon={ChevronLeftMinor}
                            size="slim"
                            onClick={() => redirectToPage('WidgetsManagement')}
                        >
                            <div className="page-breadcrumbs-label">Back to list</div>
                        </Button>
                    </div>

                    <DisplayText>Create Widget</DisplayText>

                    <div className="page-subtitle">Configure and save your widget. And then install it.</div>
                </Card.Section>

                <Card.Section>
                    <div className="section-title">
                        <DisplayText size="small">Widget name</DisplayText>
                    </div>

                    <TextField
                        autoFocus
                        placeholder="Widget name"
                        type="Text"
                        value={widgetSelected.name}
                        onChange={value => {
                            let newWidgetSelected = { ...widgetSelected };
                            newWidgetSelected.name = value;
                            this.setState({ widgetSelected: newWidgetSelected });
                        }}
                        helpText="Name your widget. The name will be displayed only in your admin panel."
                        error={widgetSelected.name ? false : 'Widget name is required'}
                    />
                </Card.Section>

                <Card.Section>
                    <div className="section-title">
                        <DisplayText size="small">Adjust settings</DisplayText>
                    </div>

                    {/* Mobile section */}
                    <div className="mobile-section-title" onClick={() => this.setState({ openSidebar: !openSidebar })}>
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
                        <div className="right-content">
                            <Templates />
                        </div>

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
                                actions.editWidgetAction({});
                                this.setState({ ...INITIAL_STATE });
                                redirectToPage('WidgetsManagement');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button primary>Save and Exit</Button>
                    </Stack>
                </Card.Section>

                {toast.show && (
                    <Toast
                        content={toast.content}
                        error={toast.error}
                        onDismiss={() => this.setState({ toast: { ...INITIAL_STATE.toast } })}
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsCreate);
