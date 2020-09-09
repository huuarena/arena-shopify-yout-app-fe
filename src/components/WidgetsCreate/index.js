import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Sidebar from 'react-sidebar';
import {
    Button,
    DisplayText,
    Card,
    TextField,
    Icon,
    Stack,
} from '@shopify/polaris';
import {
    ChevronLeftMinor,
    ArrowRightMinor,
    SettingsMajorMonotone,
    ChevronRightMinor,
} from '@shopify/polaris-icons';
import TemplateCustom from '../TemplateCustom';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
        templates: state.templates,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class WidgetsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetSelected: {},
            sidebarOpen: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (
            Object.keys(props.widgets.selected).length > 0 &&
            Object.keys(state.widgetSelected).length === 0
        ) {
            return {
                widgetSelected: props.widgets.selected,
            };
        }

        return null;
    }

    renderLeftContent = () => {
        const { templates } = this.props;
        const { widgetSelected } = this.state;

        console.log('widgetSelected :>> ', widgetSelected);

        return (
            <div className="cards-select">
                <div className="title">
                    <DisplayText size="small">
                        Select a template to start with
                    </DisplayText>
                </div>

                <div className="cards-block">
                    {templates.length > 0 &&
                        templates.map(item => (
                            <div
                                key={item.id}
                                className="widget-card"
                                className={`widget-card${
                                    widgetSelected.template === item.id
                                        ? ` widget-card-selected`
                                        : ``
                                }`}
                            >
                                <div className="widget-card-body">
                                    <img alt={item.label} src={item.avatar} />
                                    <div className="widget-card-label">
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="footer-actions">
                    <button>
                        <div className="button-label">
                            Continue with this template
                        </div>
                        <Icon source={ArrowRightMinor} color="white" />
                    </button>
                </div>
            </div>
        );
    };

    render() {
        const { redirectPage, widgets } = this.props;
        const { sidebarOpen } = this.state;

        console.log('widgets.selected :>> ', widgets.selected);
        console.log('this.state :>> ', this.state);

        return (
            <div className="widget-create">
                <Card.Section>
                    <div className="page-breadcrumbs">
                        <Button
                            plain
                            icon={ChevronLeftMinor}
                            size="slim"
                            onClick={() => redirectPage()}
                        >
                            <div className="page-breadcrumbs-label">
                                Back to list
                            </div>
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
                        placeholder="Widget name"
                        type="Text"
                        // value={''}
                        // onChange={}
                        helpText="Name your widget. The name will be displayed only in your admin panel."
                    />
                </Card.Section>

                <Card.Section>
                    <div className="section-title">
                        <DisplayText size="small">Adjust settings</DisplayText>
                    </div>

                    {/* Mobile section */}
                    <div
                        className="mobile-section-title"
                        onClick={() =>
                            this.setState({ sidebarOpen: !sidebarOpen })
                        }
                    >
                        <div className="title">
                            <div className="btn-icon">
                                <Icon
                                    source={SettingsMajorMonotone}
                                    color="white"
                                />
                            </div>
                            <div>Wiget Setting</div>
                        </div>
                        <div className="btn-icon">
                            <Icon source={ChevronRightMinor} color="white" />
                        </div>
                    </div>

                    {/* Desktop section */}
                    <div className="widget-create-body">
                        <div className="left-content">
                            {/* {this.renderLeftContent()} */}
                            <TemplateCustom />
                        </div>
                        <div className="right-content"></div>

                        <div className="sidebar">
                            <Sidebar
                                sidebar={<div>{this.renderLeftContent()}</div>}
                                open={sidebarOpen}
                                onSetOpen={() =>
                                    this.setState({ sidebarOpen: !sidebarOpen })
                                }
                            >
                                <div></div>
                            </Sidebar>
                        </div>
                    </div>
                </Card.Section>

                <Card.Section>
                    <Stack distribution="trailing">
                        <Button>Cancel</Button>
                        <Button primary>Save and Exit</Button>
                    </Stack>
                </Card.Section>
            </div>
        );
    }
}

export default connect(mapStateToProps)(WidgetsCreate);
