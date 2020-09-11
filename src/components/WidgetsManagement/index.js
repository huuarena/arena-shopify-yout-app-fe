import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import { DisplayText, Stack, Button, Card } from '@shopify/polaris';
import './styles.scss';
import formatDateTime from '../../utils/formatDateTime';
import {
    EditMajorMonotone,
    DuplicateMinor,
    DeleteMajorMonotone,
} from '@shopify/polaris-icons';
import Switch from 'react-switch';
import { getWidgets } from '../../apis/widgets';
import { getTemplates } from '../../apis/templates';

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
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
        this.state = {
            widgets: {},
        };
    }

    _getWidgets = async () => {
        const res = await getWidgets();
        console.log('getWidgets res :>> ', res);
    };

    _getTemplates = async () => {
        const res = await getTemplates();
        console.log('getTemplates res :>> ', res);
    };

    componentDidMount() {
        this._getWidgets();
        this._getTemplates();
    }

    static getDerivedStateFromProps(props, state) {
        if (
            props.widgets.data.length > 0 &&
            Object.keys(state.widgets).length === 0
        ) {
            return {
                widgets: props.widgets,
            };
        }

        return null;
    }

    renderTableBody = () => {
        const { actions, redirectToPage } = this.props;
        const { widgets } = this.state;

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
                        <td>
                            {formatDateTime(item.updated_at, 'Month DD, YYYY')}
                        </td>
                        <td>
                            <Stack>
                                <Button
                                    plain
                                    icon={EditMajorMonotone}
                                    onClick={() => {
                                        actions.editWidgetAction(item);
                                        redirectToPage('WidgetsCreate');
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button plain icon={DuplicateMinor}>
                                    Duplicate
                                </Button>
                                <Button plain icon={DeleteMajorMonotone}>
                                    Remove
                                </Button>
                            </Stack>
                        </td>
                        <td>
                            <Stack wrap={false}>
                                <Switch
                                    height={20}
                                    width={46}
                                    onChange={() => {
                                        if (widgets.selected !== item.id) {
                                            let newWidgets = { ...widgets };
                                            newWidgets.selected = item.id;
                                            this.setState({
                                                widgets: newWidgets,
                                            });
                                        }
                                    }}
                                    checked={widgets.selected === item.id}
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

    renderWidgetsTable = () => {
        const { redirectToPage, actions } = this.props;

        return (
            <Card.Section>
                <div className="title">
                    <Stack alignment="center">
                        <DisplayText>Widgets</DisplayText>
                        <Button
                            primary
                            size="slim"
                            onClick={() => {
                                actions.editWidgetAction({});
                                redirectToPage('WidgetsCreate');
                            }}
                        >
                            Create widget
                        </Button>
                    </Stack>
                </div>

                <div className="subtitle">
                    Create, edit or remove your widgets. Press install to place
                    them on the required page.
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

    renderWidgetWelcome = () => {
        const { redirectToPage, actions } = this.props;

        return (
            <Card.Section>
                <div className="widget-welcome">
                    <DisplayText size="extraLarge">
                        Welcome to YouTube Gallery
                    </DisplayText>
                    <DisplayText size="small">
                        Display YouTube channels and videos on your website.
                    </DisplayText>

                    <div className="action">
                        <DisplayText size="small">
                            Let’s create your first widget!
                        </DisplayText>
                    </div>

                    <Button
                        primary
                        onClick={() => {
                            actions.editWidgetAction({});
                            redirectToPage('WidgetsCreate');
                        }}
                    >
                        Create widget
                    </Button>
                </div>
            </Card.Section>
        );
    };

    render() {
        const { widgets } = this.state;

        return (
            <div className="widgets-management">
                {Object.keys(widgets).length > 0 && widgets.data.length > 0
                    ? this.renderWidgetsTable()
                    : this.renderWidgetWelcome()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsManagement);
