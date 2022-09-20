// frontend/src/components/SignupFormModal/SignupForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import logoSplash from '../../icons/logoSplash.svg';

function SignupForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username: `${firstName}${lastName[0]}`, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-all">
    <form onSubmit={handleSubmit}>
    <div className="signup-form-top">
      <div className='signup-form-logo'><img src={logoSplash} style={{ height: 50 }} alt='logo'></img></div>
      <div className="signup-form-title">Signup</div>
      {/* <div className="signup-form-top-member">Already a member? Log in</div> */}
    </div>
    <div className="signup-form-stuff">
    <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Email address
        <input
          type="text"
          value={email}
          placeholder='example@email.com'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      {/* <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label> */}
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <p></p>
      <button type="submit" className="submit-button">Sign up</button>
      </div>
    </form>
    </div>
  );
}

export default SignupForm;
