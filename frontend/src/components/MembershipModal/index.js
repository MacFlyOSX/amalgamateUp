// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { MemberModal } from '../../context/MemberModal';
import EditMembers from './MembershipEdit';
import './Membership.css';

function MembershipModal({modalVal, groupId}) {
  if (!modalVal) modalVal = false;
  console.log(groupId)
  const [showModal, setShowModal] = useState(modalVal);

  return (
    <>
      <span className='membership-edit-button' onClick={() => setShowModal(true)}>*Membership requests*</span>
      {showModal && (
        <MemberModal onClose={() => setShowModal(false)}>
          <EditMembers groupId={groupId} onClick={() => setShowModal(false)} />
        </MemberModal>
      )}
    </>
  );
}

export default MembershipModal;
