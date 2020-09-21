import { Spinner } from '@shopify/polaris';
import React from 'react';
import './styles.scss';

function Preloader(props) {
    return (
        <div className="preloader">
            <Spinner size="large" color="inkLightest" />
        </div>
    );
}

export default Preloader;
