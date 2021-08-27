import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { url_add_room, url_rooms, url_auth, url_named_user} from "./../Routes"
import User from '../User/User';
import { useAuth0 } from "@auth0/auth0-react";
import '../general.css'

const Users = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [accessToken, setAccessToken] = useState(''); 
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { logout } = useAuth0();
    const axios = require('axios').default;
    const queryString = require('query-string');
    useEffect(() => {
        const getToken = async () => {
            console.log("ENTRA AL GET TOKEN")
            
            var myHeaders = new Headers();
            myHeaders.append("content-type", "application/x-www-form-urlencoded");
            myHeaders.append("Cookie", "__cfduid=d083a3aed605691cdf60e93ad5170b9291604625828; did=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso; did_compat=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso");

            var urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "client_credentials");
            urlencoded.append("client_id", "PZPWHSA4HEWEX470bJCptAwLtbqAprTL");
            urlencoded.append("client_secret", "UsrbdXmXiATreBRyreIG2bWc5x2JB80RBsUYg34z1PWdm8_11K9VqD8VlBs3yrli");
            urlencoded.append("audience", "https://dev-3qxptrmu.us.auth0.com/api/v2/");

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };
            fetch("https://dev-3qxptrmu.us.auth0.com/oauth/token", requestOptions)
            .then(response => response.json())
            .then((result) => {
                let token = 'Bearer ' + result.access_token;
                setAccessToken(token);
                getUsers(token);

            })
            .catch(error => console.log('error', error));
        }
        getToken();

        const getUsers = async (_token) =>{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", _token);
            myHeaders.append("Cookie", "__cfduid=ddf00fd39ef65870898d0cec7953765f41604810630");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://dev-3qxptrmu.us.auth0.com/api/v2/users", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    let jsonResult = JSON.parse(result);
                    console.log("result typem: ", typeof(result));
                    console.log("json result type: ", typeof(jsonResult));
                    console.log("IMPORTANNTISIMO: ", jsonResult);
                    setUsers(jsonResult)
                })
                .catch(error => console.log('error', error));
        }
        
        
    },[]);

    const handleAdminPanel = () => {
        history.push('/admin')        

    }

    const handleEnterProfile = (event) => {
        event.preventDefault();
        const data = event.target.value.split(' | ');
        let userId = data[0].split(':')[1];
        let email = data[1].split(':')[1];
        let username = data[2].split(':')[1];
        let admin = data[3].split(':')[1];
        console.log(userId);
        console.log(username);
        history.push(`/profile?userId=${userId}&username=${username}&admin=${admin}&email=${email}`)

    }
    const handleRegisterClick = () => {

        const params = {
            username: name,
            password: password,
            email: email,
        };
    
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(params)
        } 
        const url_ = url_named_user
        fetch(url_, requestOptions)
            .then( (response) => {
                return response.json()
                
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload();
    }
        
        // var sepData = data.split(".")
        // const chatId = sepData[0]
        // const chatName = sepData[1]
        // history.push(`/chat?name=${chatName}&room=${chatId}`);
        // window.location.reload();
    

    // const handleSubmitNewRoom = (event) => { 
    //     var NewRoomHeader = new Headers();
    //     const requestOptionsAddRoom = {
    //         method: 'POST',
    //         headers: NewRoomHeader,
    //         redirect: 'follow'
    //     };
    //     event.preventDefault();
    //     const url_ = url_add_room + newRoomName
    //     fetch(url_, requestOptionsAddRoom)
    //         .then(response => response.text())
    //         .catch(error => console.log('error', error));
    //     window.location.reload();
    // }

 

    const handleLogOutClick = () => {
        window.localStorage.removeItem('userId');
        logout({ returnTo: url_auth })
    }

    return (
        <div class="Full">
            <div class="Console">
            <div className={'Bar'}>
                <div className={'Left'}>
                    <div><button type="submit" onClick={handleAdminPanel}>Back to Admin Panel</button></div>
                </div>
                <div className={'Right'}>
                    <h3> <button type="submit" onClick={handleLogOutClick}> Log Out</button></h3>
                </div>
            </div>
                <br></br>
                <br></br><br></br>
                <h3>Users</h3>
                <br></br> 
                <div id="user-list">
                    <User users={users} handleEnterProfile={handleEnterProfile}/>                
                </div>
                <br></br>
                <h3>New User</h3>
                <br></br>
                <div>
                    <input className='JoinInput' placeholder = "Name" type ="text" onChange={(event) => setName(event.target.value)}/>
                    <input className='JoinInput' placeholder = "Email" type ="text" onChange={(event) => setEmail(event.target.value)}/>
                    <input className='JoinInput' placeholder = "Password" type ="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" onClick={handleRegisterClick}>Create</button>

            </div>
        </div>
        )
}

export default Users;