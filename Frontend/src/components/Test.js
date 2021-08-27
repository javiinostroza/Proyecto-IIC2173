import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { url_auth } from "./Routes";

const Test = () => {

    const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
    const [loaded, setLoaded] = useState('');
    const [userData, setUserData] = useState('');
    const [userMetaData, setUserMetadata] = useState('');
    
    useEffect (() => {
      if (isLoading){
      } else if (!loaded){
        setLoaded(true);
        const getUserMetadata = async () => {
          const domain = "dev-3qxptrmu.us.auth0.com";
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });
            
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log("ERROR:", e.message);
          }
        };
        getUserMetadata();
        window.localStorage.setItem('userId', userMetaData.id);
      }
    });

    return (
        isAuthenticated && (
            <div >
              <p >{isLoading}</p>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p >ID: {userMetaData.id}</p>
              <button type="submit" onClick={() => logout({ returnTo: url_auth })}> Log Out</button>
            </div>
          )
    )


}

export default Test;