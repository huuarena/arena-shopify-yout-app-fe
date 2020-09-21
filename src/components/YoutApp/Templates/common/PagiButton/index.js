import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

PagiButton.propTypes = {
    variant: PropTypes.oneOf(['previous', 'next', 'down', 'up']),
    onClick: PropTypes.func,
};

function PagiButton(props) {
    const { variant, onClick } = props;

    return (
        <div className={`pagi-button pagi-button-${variant}`} onClick={() => onClick()}>
            <div className={`icon icon-${variant}`} />
        </div>
    );
}

export default PagiButton;
