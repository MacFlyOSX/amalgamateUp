// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';

function LoginFormModal({modalVal}) {
  if (!modalVal) modalVal = false;
  const [showModal, setShowModal] = useState(modalVal);

  return (
    <>
      <button className='login-button' onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
