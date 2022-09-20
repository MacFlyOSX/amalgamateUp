// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from '../../icons/logo.svg';
import greenBlob from '../../icons/greenBlob.svg';
import redBlob from '../../icons/redBlob.svg';
import yellowBlob from '../../icons/yellowBlob.svg';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation();
  console.log('this is where we are 👉️', location);
  const pathname = location.pathname;
  console.log('this is where we are 👉️', pathname);
  const [onRoot, setOnRoot] = useState(!!(pathname === '/'));
  console.log(onRoot);

  useEffect(() => {
    if(pathname !== '/') {
      setOnRoot(false);
    } else {
      setOnRoot(true);
    }
  }, [location, pathname]);

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
      {/* {onRoot &&
      <>
        <div className='nav-bg-mid'>
          <img src={yellowBlob} alt='yellow' />
        </div>
        <div className='nav-bg-right'>
          <img src={greenBlob} alt='green' />
        </div>
      </>
      } */}
    </div>
  );
}

export default Navigation;
