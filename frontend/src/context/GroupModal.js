// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './GroupModal.css';

const GroupModalContext = React.createContext();

export function GroupModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <GroupModalContext.Provider value={value}>
        {children}
      </GroupModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function GroupModal({ onClose, children }) {
  const modalNode = useContext(GroupModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="group-modal">
      <div id="group-modal-background" onClick={onClose} />
      <div id="group-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
