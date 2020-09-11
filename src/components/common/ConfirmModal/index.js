import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@shopify/polaris';

ConfirmModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

function ConfirmModal(props) {
    const { onClose, title, content, onConfirm, onCancel } = this.props;

    return (
        <Modal
            // activator={activator}
            open={true}
            onClose={onClose}
            title={title}
            primaryAction={{
                content: 'Confirm',
                onAction: onConfirm,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: onCancel,
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>{content}</p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}

export default ConfirmModal;
