import React from "react";
import { NavLink } from 'react-router-dom';
import pointingUp from '../../icons/pointingUp.png';
import './MustLogin.css';

const MustLoginPage = () => {
    return (
        <div className="wrong-page-container">
            <h1 className="must-sign-in">
                You must be logged in to create a group.<br />Log in or Sign up.
            </h1>
            <img className="pointing-man" src={pointingUp} alt='pointing-up' />
        </div>
    )
}

export default MustLoginPage;
