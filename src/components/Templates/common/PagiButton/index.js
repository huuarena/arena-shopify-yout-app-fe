import React from 'react';
import PropTypes from 'prop-types';

PagiButton.propTypes = {
    previous: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: PropTypes.func,
};

PagiButton.defaultProps = {
    previous: true,
    size: 'medium',
};

function PagiButton(props) {
    const { previous, size, onClick } = props;

    return (
        <div
            className={`pagi-button pagi-button-${
                previous ? 'previous' : 'next'
            } pagi-button-${size}`}
            onClick={() => onClick()}
        >
            <div className={previous ? 'icon icon-prev' : 'icon icon-next'} />
        </div>
    );
}

export default PagiButton;
