// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import logoSplash from '../../icons/logoSplash.svg';

function LoginForm({onClick}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data.message);
      }
    );
  };

  return (
    <div className="form-all">
    <form onSubmit={handleSubmit}>
    <div className="form-top">
      <div className='form-logo'><img src={logoSplash} style={{ height: 50 }} alt='logo'></img></div>
      <div className="form-title">Log in</div>
      <div className="form-top-member">Not a member yet? Sign up</div>
    </div>
    <div className="form-stuff"><br />
      <ul className={errors.length ? "login-error-stuff" : 'no-errors'}>
        {errors}
      </ul>
      <label>
        <p>Username or Email</p>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <p></p>
      <button type="submit" className="submit-button">Log in</button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
