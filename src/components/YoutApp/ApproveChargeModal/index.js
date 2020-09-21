import React, { Component } from 'react'
import { Modal, Card } from '@shopify/polaris'
import PropTypes from 'prop-types'
import './styles.scss'
import ChargeCard from './components/ChargeCard'

const chargeData = [
    {
        type: 'yearly',
        label: 'Yearly',
        price: 4.99,
        sale: 17,
        description:
            'Approving the annual charge ends your free trial, and you will get billed at once',
    },
    {
        type: 'monthly',
        label: 'Monthly',
        price: 5.99,
        sale: 0,
        description: '',
    },
]

class ApproveChargeModal extends Component {
    render() {
        const { onClose } = this.props

        return (
            <Modal
                open={true}
                onClose={() => onClose()}
                title={
                    <span className="approve-charge-modal-title">
                        Approve charge for YouTube Gallery
                    </span>
                }
            >
                <Card sectioned>
                    <div className="approve-charge-modal-body">
                        <div className="approve-charge-modal-sub-title">
                            <div className="sub-title">
                                <p>Your trial period is over.</p>
                                <p>
                                    To continue using the YouTube Gallery,
                                    approve the charge.
                                </p>
                            </div>
                        </div>

                        <div className="cards">
                            {chargeData.map((data, index) => (
                                <ChargeCard key={index} data={data} />
                            ))}
                        </div>

                        <div className="later-button" onClick={() => onClose()}>
                            Later
                        </div>
                    </div>
                </Card>
            </Modal>
        )
    }
}

ApproveChargeModal.propTypes = {
    onClose: PropTypes.func,
}

export default ApproveChargeModal
