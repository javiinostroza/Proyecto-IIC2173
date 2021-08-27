import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { url_add_room, url_rooms, url_auth } from "./../Routes"
import { useAuth0 } from "@auth0/auth0-react";
import Rooms from '../Rooms/Rooms';
import './RoomsPanel.css'

const RoomsPanel = () => {
    const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
    const [loaded, setLoaded] = useState(false);

    const checkUserUndefined = () => {
        if (window.localStorage.getItem('userId') == undefined) {
            window.localStorage.removeItem('userId');
        }
    }

    useEffect(() => {
        checkUserUndefined();
        if (isLoading){
        } else if (!loaded) {
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
            
                    window.localStorage.setItem('userId', user_metadata.id);
                } catch (e) {
                    console.log("ERROR:", e.message);
                }
            };
            var requestOptions = {
                Accept: 'application/json',
                method: 'GET'
            };
            const getRooms = async () => {
                fetch(url_rooms, requestOptions) 
                .then( async (response) => {
                    try {
                        const data = await response.json()
                        .then(result => {
                            setRooms(result);
                        })
                    } catch (err) {
                        console.log(err);
                    }
                })
            }
            getUserMetadata();
            getRooms();
        }
    });

    const handleExitPanel = () => {
        history.push('/admin')
    }

    const handleEnterChat = (event) => {
        event.preventDefault();
        const data = event.target.value;
        var sepData = data.split(".")
        const chatId = sepData[0]
        const chatName = sepData[1]
        history.push(`/admin/chat?name=${chatName}&room=${chatId}`);
        window.location.reload();
    }


    const handleLogOutClick = () => {
        window.localStorage.removeItem('userId');
        logout({ returnTo: url_auth })
    }
    // If is admin: 
    return (
        isAuthenticated && (
        <div key={isLoading} class="Full">
            <div class="Console">
            <div className={'Bar'}>
                <div className={'Left'}>
                    <div><button type="submit" onClick={handleExitPanel}>Back to Admin Panel</button></div>
                </div>
                <div className={'Right'}>
                    <h3> <button type="submit" onClick={handleLogOutClick}> Log Out</button></h3>
                </div>
            </div>
                <br></br>
            
                <br></br><br></br>
                <div class="container">
                    <div class="box">
                        <h3>Rooms</h3>
                        <br></br> 
                        <div id="rooms-list">
                            <Rooms rooms={rooms} handleEnterChat={handleEnterChat} />                
                        </div>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
        )
    )
}
export default RoomsPanel;