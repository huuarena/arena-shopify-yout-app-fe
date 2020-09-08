import React, { Component } from 'react';
import WidgetsManagement from '../WidgetsManagement';
import WidgetsCreate from '../WidgetsCreate';

class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    renderComponent = () => {
        const { page } = this.state;

        switch (page) {
            case 0:
                return (
                    <WidgetsManagement
                        redirectPage={() => this.setState({ page: 1 })}
                    />
                );

            case 1:
                return (
                    <WidgetsCreate
                        redirectPage={() => this.setState({ page: 0 })}
                    />
                );

            default:
                return (
                    <WidgetsManagement
                        redirectPage={() => this.setState({ page: 1 })}
                    />
                );
        }
    };
    render() {
        return <div>{this.renderComponent()}</div>;
    }
}

export default Widgets;
