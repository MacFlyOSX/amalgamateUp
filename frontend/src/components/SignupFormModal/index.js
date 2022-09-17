// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { SignupModal } from '../../context/SignupModal';
import SignupForm from './SignupForm';
import './SignupForm.css';

function SignupFormModal({modalVal}) {
  if (!modalVal) modalVal = false;
  const [showModal, setShowModal] = useState(modalVal);

  return (
    <>
      <button className='signup-button' onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <SignupModal onClose={() => setShowModal(false)}>
          <SignupForm />
        </SignupModal>
      )}
    </>
  );
}

export default SignupFormModal;
