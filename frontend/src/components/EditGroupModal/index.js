// frontend/src/components/EditGroupModal/index.js
import React, { useState } from 'react';
import { GroupModal } from '../../context/GroupModal';
import EditGroupForm from './EditGroup';
import './EditGroupForm.css';

function EditGroupModal({modalVal}) {
  if (!modalVal) modalVal = false;
  const [showModal, setShowModal] = useState(modalVal);

  return (
    <>
      <button className='signup-button' onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <GroupModal onClose={() => setShowModal(false)}>
          <EditGroupForm />
        </GroupModal>
      )}
    </>
  );
}

export default EditGroupModal;
