// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './MembershipEdit';
import './Membership.css';

function MembershipModal({modalVal}) {
  if (!modalVal) modalVal = false;
  const [showModal, setShowModal] = useState(modalVal);

  return (
    <>
      <span className='membership-edit-button' onClick={() => setShowModal(true)}>*Pending requests*</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default MembershipModal;
