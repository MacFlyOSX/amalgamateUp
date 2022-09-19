// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from '../../icons/logo.svg';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='login'>
          <LoginFormModal />
        </div>
        <div className='signup'>
          <SignupFormModal />
          {/* <NavLink to="/signup"><p className='signup-words'>Sign up</p></NavLink> */}
        </div>
      </>
    );
  }

  return (
    <div className='header'>
      <div className='logo'>
          <NavLink className='logo' exact to="/"><img src={logo} style={{ height: 50 }} alt='logo'></img></NavLink>
      </div>
      <div className='right'>
          {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
