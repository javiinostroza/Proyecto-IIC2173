import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {url_auth, url_requests, url_request_accept } from "./../Routes"
import { useAuth0 } from "@auth0/auth0-react";
import queryString from "query-string";
// import Rooms from '../Rooms/Rooms';
// import './RoomsPanel.css'

const AdminCss = () => {
    const history = useHistory();
    const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
    const [loaded, setLoaded] = useState(false);
    const [isAdmin, setAdminStatus] = useState(false);
    const [requests, setRequests] = useState([])

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            var requestOptions = {
                method: 'GET',
            };

            const url_ = url_requests;
            fetch(url_, requestOptions)
                .then((response) => {
                    return response.json().then((data) => {
                        const list = data
                        list.sort((a,b) => {
                            if(a.created_at > b.created_at){
                                return 1;
                            }else{
                                return -1;
                            }
                        })
                        setRequests(list);
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    })
                })
        }
    }, [requests]);

    const checkUserUndefined = () => {
        if (window.localStorage.getItem('userId') == undefined) {
            window.localStorage.removeItem('userId');
        }
    }

    const handleExitPanel = () => {
        history.push('/admin')
    }

    const handleAccept  = (request) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", request.id);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };


        const url_ = url_request_accept;
        fetch(url_, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    console.log(data)
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
            })
        window.location.reload()
    }



    const handleLogOutClick = () => {
        window.localStorage.removeItem('userId');
        logout({ returnTo: url_auth })
    }
    // If is admin: 
    if (window.localStorage.getItem('isAdmin') === "true"){
    return (
        isAuthenticated && (
        <div key={isLoading} class="Full">
            <div class="Console">
            <div className={'Bar'}>
                    <div><button type="submit" onClick={handleExitPanel}>Exit to Admin Panel</button></div>
                    <h3> <button type="submit" onClick={handleLogOutClick}> Log Out</button></h3>
            </div>
                <div class="container">
                    <div class="box">
                        <h3>Requests</h3>
                        <div id="requests-list">
                            {requests.map((request) => <div>
                                <button onClick={() => handleAccept(request)} > { request.id }. Sala {request.room_id} {request.accepted? 'Accepted': 'Pending'} </button>
                                <a href={request.url} target = "_blank">Review</a>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    )
    } else {
        return <div> Unauthorized</div>
    }
}
export default AdminCss;