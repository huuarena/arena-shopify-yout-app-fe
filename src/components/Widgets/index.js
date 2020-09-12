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

    _redirectToPage = page => {
        console.log('_redirectToPage ' + page);
        this.setState({ page });
    };

    renderComponent = () => {
        const { page } = this.state;

        switch (page) {
            case 'WidgetsManagement':
                return <WidgetsManagement redirectToPage={value => this._redirectToPage(value)} />;

            case 'WidgetsCreate':
                return <WidgetsCreate redirectToPage={value => this._redirectToPage(value)} />;

            default:
                return <WidgetsManagement redirectToPage={value => this._redirectToPage(value)} />;
        }
    };

    render() {
        return <div>{this.renderComponent()}</div>;
    }
}

export default Widgets;
