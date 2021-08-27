import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const HomeGuest = () => {
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const { loginWithRedirect } = useAuth0();

  const handleRegisterClick = () => {
    history.push('/register');
  };

  window.localStorage.setItem('userId', userId);

  return (

    <div className={'Full'}>
        <div className={'Console'}>
            <div className={'Inputs'}>
                <h1> Welcome! </h1>
                    <button type="submit" onClick={() => loginWithRedirect()}> Log In</button>
                    <button type="submit"  onClick={handleRegisterClick}> Sign Up </button>
            </div>
        </div>
    </div>
  );
};

export default HomeGuest;