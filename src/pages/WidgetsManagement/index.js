import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { DisplayText, Stack, Button, Card, Toast } from '@shopify/polaris';
import './styles.scss';
import formatDateTime from '../../utils/formatDateTime';
import Switch from 'react-switch';
import { updateYoutApp } from '../../apis/yout_app';
import ConfirmModal from '../../components/YoutApp/ConfirmModal';

const INITIAL_STATE = {
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
        yout_app: state.yout_app,
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

    componentDidMount() {
        const { actions } = this.props;

        actions.changeWidgetSelectedAction({});
    }

    renderWidgetWelcome = () => {
        const { redirectToPage, actions } = this.props;

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
                            await actions.changeWidgetSelectedAction({});
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
        this.setState({ isLoading: true });

        const { yout_app, actions } = this.props;

        let newWidgets = [];

        yout_app.widgets.forEach((element) => {
            if (element.id === id) {
                let widget = { ...element };
                widget.enabled = !element.enabled;
                newWidgets.push(widget);
            } else {
                newWidgets.push(element);
            }
        });

        const data_stringify = JSON.stringify(newWidgets);
        const res = await updateYoutApp('widgets', data_stringify);
        console.log('updateYoutApp res :>> ', res);
        if (res.success) {
            this.setState({
                toast: {
                    show: true,
                    content: 'Update widgets successfully!',
                    error: false,
                },
                isLoading: false,
            });
            actions.changeYoutAppWidgetsAction(newWidgets);
        } else {
            this.setState({
                toast: {
                    show: true,
                    content: 'Update widgets Failed. Retry',
                    error: true,
                },
                isLoading: false,
            });
        }
    };

    handleRemove = async () => {
        this.setState({ isLoading: true });

        const { yout_app, actions } = this.props;
        const { widgetDeleted } = this.state;

        let newWidgets = [];

        yout_app.widgets.forEach((element) => {
            if (element.id !== widgetDeleted) {
                newWidgets.push(element);
            }
        });

        const data_stringify = JSON.stringify(newWidgets);
        const res = await updateYoutApp('widgets', data_stringify);
        console.log('updateYoutApp res :>> ', res);
        if (res.success) {
            this.setState({
                toast: {
                    show: true,
                    content: 'Delete widgets successfully!',
                    error: false,
                },
                isLoading: false,
                widgetDeleted: '',
            });
            actions.changeYoutAppWidgetsAction(newWidgets);
        } else {
            this.setState({
                toast: {
                    show: true,
                    content: 'Delete widgets Failed. Retry',
                    error: true,
                },
                isLoading: false,
                widgetDeleted: '',
            });
        }
    };

    renderTableBody = () => {
        const { yout_app, actions, redirectToPage } = this.props;
        const { widgets } = yout_app;

        return (
            <tbody>
                {widgets.map((item) => (
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
                                        await actions.changeWidgetSelectedAction(item);
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
                                    checked={item.enabled}
                                />
                                <div className="widget-status">{item.enabled ? 'On' : 'Off'}</div>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    renderWidgetsManagement = () => {
        const { actions, redirectToPage } = this.props;

        return (
            <div className="widgets-management-body">
                <div className="title">
                    <Stack distribution="equalSpacing" alignment="center">
                        <Stack.Item fill>
                            <Stack alignment="center">
                                <DisplayText>Widgets</DisplayText>
                                <Button
                                    primary
                                    size="slim"
                                    onClick={async () => {
                                        await actions.changeWidgetSelectedAction({});
                                        redirectToPage('WidgetsCreate');
                                    }}
                                >
                                    Create widget
                                </Button>
                            </Stack>
                        </Stack.Item>
                        <Stack.Item>
                            <Button size="slim">Refresh Youtube Data</Button>
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
            </div>
        );
    };

    render() {
        const { yout_app } = this.props;
        const { toast, widgetDeleted } = this.state;

        return (
            <div className="widgets-management">
                {yout_app.widgets.length > 0
                    ? this.renderWidgetsManagement()
                    : this.renderWidgetWelcome()}

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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsManagement);
