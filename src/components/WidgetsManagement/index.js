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
            enabled: false,
        };
    }

    renderTableBody = () => {
        const { widgets, actions, redirectPage } = this.props;

        return (
            <tbody>
                {widgets.data.map(item => (
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
                                        redirectPage();
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
                                    onChange={() =>
                                        this.setState({
                                            enabled: !this.state.enabled,
                                        })
                                    }
                                    checked={this.state.enabled}
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

    render() {
        const { redirectPage, widgets, actions } = this.props;

        console.log('this.props', this.props);

        return (
            <div className="widgets-management">
                <Card.Section>
                    <Stack alignment="center">
                        <DisplayText>Widgets</DisplayText>
                        <Button
                            primary
                            size="slim"
                            onClick={() => {
                                actions.editWidgetAction({});
                                redirectPage();
                            }}
                        >
                            Create widget
                        </Button>
                    </Stack>

                    <div className="subtitle">
                        Create, edit or remove your widgets. Press install to
                        place them on the required page.
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

                            {widgets.data.length > 0 ? (
                                this.renderTableBody()
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            <div className="empty-data">
                                                You have no data
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </Card.Section>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsManagement);
