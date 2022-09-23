// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import chevron from '../../icons/chevron.svg';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const firstLetter = user.firstName[0];

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="user-container-everything">
      <button className="user-container-button" onClick={openMenu}>
          <div className="user-icon">
            <span className="first-letter">{firstLetter}</span>
          </div>
          <div className="user-chevron-container">
            <img className={!!showMenu ? 'user-chevron-flipped' : 'user-chevron'} src={chevron} alt='chevron' />
          </div>
      </button>
      <div className="menu-container">
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="username-dropdown">{` ${user.firstName} ${user.lastName}`}</li>
          <li>
            <button className="user-log-out" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      </div>
      </div>
    </>
  );
}

export default ProfileButton;
