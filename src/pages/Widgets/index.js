import React, { Component } from 'react';
import WidgetsManagement from '../WidgetsManagement';
import WidgetsCreate from '../WidgetsCreate';

const INITIAL_STATE = {
    page: '',
};

class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    render() {
        const { page } = this.state;

        switch (page) {
            case 'WidgetsManagement':
                return (
                    <WidgetsManagement redirectToPage={(value) => this.setState({ page: value })} />
                );

            case 'WidgetsCreate':
                return <WidgetsCreate redirectToPage={(value) => this.setState({ page: value })} />;

            default:
                return (
                    <WidgetsManagement redirectToPage={(value) => this.setState({ page: value })} />
                );
        }
    }
}

export default Widgets;
