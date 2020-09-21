import React, { Component } from 'react';
import { Stack, Card, Button } from '@shopify/polaris';
import './styles.scss';
import ApproveChargeModal from '../ApproveChargeModal';

const INITIAL_STATE = {
    showApproveCharge: false,
};

class AppBanner extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    render() {
        const { showApproveCharge } = this.state;

        return (
            <div className="page-wrapper">
                <div className="yout-app-banner">
                    <Card sectioned>
                        <Stack distribution="equalSpacing" alignment="center">
                            <Stack.Item>
                                <div className="banner-text">
                                    Approve charge to continue using the app after the trial ends.{' '}
                                    <b>0</b> days of trial left.
                                </div>
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
                                <div className="icon-banner-block">
                                    <div className="icon-banner" />
                                </div>
                            </Stack.Item>
                        </Stack>
                    </Card>

                    {showApproveCharge && (
                        <ApproveChargeModal
                            onClose={() => this.setState({ showApproveCharge: false })}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AppBanner;
