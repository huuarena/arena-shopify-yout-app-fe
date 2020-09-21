import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DisplayText, Button, Caption } from '@shopify/polaris'
import './styles.scss'

class ChargeCard extends Component {
    render() {
        const { data } = this.props

        return (
            <div className="charge-card">
                <div className="text-block">
                    <DisplayText size="small">{data.label}</DisplayText>
                </div>
                <div className="text-block">
                    <DisplayText size="small">
                        <b>${data.price}</b> /mo
                    </DisplayText>
                </div>
                <div className="btn-select">
                    <Button primary fullWidth>
                        Select
                    </Button>
                </div>
                <Caption>{data.description}</Caption>

                {data.sale > 0 && <div className="sale">-{data.sale}%</div>}
            </div>
        )
    }
}

ChargeCard.propTypes = {
    data: PropTypes.object.isRequired,
}

export default ChargeCard
