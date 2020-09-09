import React, { Component } from 'react';
import WidgetsManagement from '../WidgetsManagement';
import WidgetsCreate from '../WidgetsCreate';

class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '',
        };
    }

    renderComponent = () => {
        const { page } = this.state;

        console.log('page', page);

        switch (page) {
            case 'WidgetsManagement':
                return <WidgetsManagement redirectToPage={value => this.setState({ page: value })} />;

            case 'WidgetsCreate':
                return <WidgetsCreate redirectToPage={value => this.setState({ page: value })} />;

            default:
                return <WidgetsManagement redirectToPage={value => this.setState({ page: value })} />;
        }
    };

    render() {
        return <div>{this.renderComponent()}</div>;
    }
}

export default Widgets;
