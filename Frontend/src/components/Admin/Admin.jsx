import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Admin.css'

const Admin = () => {
  const history = useHistory();
  const [userId, setUserId] = useState('');

  const handleRoomsClick = () => {
    console.log("entra")
    history.push('/roomspanel');
  };
  const handleUsersClick = () => {
    history.push('/users');
  };
  const handleCSSClick = () => {
    history.push('/admin/cssrequests');
  };
  const handleMonitoringClick = () => {
    history.push('/monitoring');
  }
  const handleExitClick = () => {
      history.push('/');
  }

  window.localStorage.setItem('userId', userId);

  return (

    <div className={'Full'}>
        <div className={'Console'}>
            <div className={'Inputs'}>
                <h1> Admin Panel </h1>
                    <button type="submit" onClick={handleRoomsClick}>Go to rooms panel</button><br></br>
                    <button type="submit"  onClick={handleUsersClick}> Go to users panel </button><br></br>
                    <button type="submit"  onClick={handleCSSClick}> Go to css injections requests</button><br></br>
                    <button type="submit"  onClick={handleMonitoringClick}> Go to monitoring panel</button><br></br>
                    <button type="submit"  onClick={handleExitClick}> Exit admin panel</button><br></br>
            </div>
        </div>
    </div>
  );
};

export default Admin;