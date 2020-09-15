import React, { Component } from 'react';
import { Page, Stack, Card, Button } from '@shopify/polaris';
import './styles.scss';
import ApproveChargeModal from '../ApproveChargeModal';

class AppBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showApproveCharge: false,
        };
    }

    render() {
        const { showApproveCharge } = this.state;

        return (
            <div className="app-banner">
                <Page>
                    <Card sectioned>
                        <Stack distribution="equalSpacing" alignment="center">
                            <Stack.Item>
                                <span>
                                    Approve charge to continue using the app after the trial ends.{' '}
                                    <b>0</b> days of trial left.
                                </span>
                            </Stack.Item>
                            <Stack.Item>
                                <Button
                                    primary
                                    onClick={() =>
                                        this.setState({
                                            showApproveCharge: true,
                                        })
                                    }
                                >
                                    Approve Charge
                                </Button>
                            </Stack.Item>
                            <Stack.Item>
                                <div className="banner-icon">
                                    <div className="icon" />
                                </div>
                            </Stack.Item>
                        </Stack>
                    </Card>
                </Page>

                {showApproveCharge && (
                    <ApproveChargeModal
                        onClose={() => this.setState({ showApproveCharge: false })}
                    />
                )}
            </div>
        );
    }
}

export default AppBanner;
