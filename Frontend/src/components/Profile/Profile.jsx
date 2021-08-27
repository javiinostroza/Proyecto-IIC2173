import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {url_display_chat, url_send_message} from "./../Routes";

import '../Chat/Chat.css'
import '../general.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

const Profile = ({ location }) => {
    const history = useHistory();
    const [_email, setEmail] = useState('');
    const [_userName, setUsername] = useState('');
    const [id, setId] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [oldUserName, setOldUsername] = useState('');
    const [oldIsAdmin, setOldIsAdmin] = useState('');
    const ENDPOINT = 'ec2-18-219-25-136.us-east-2.compute.amazonaws.com:5000'
    

    useEffect(() => {
        const {userId, username, admin, email} = queryString.parse(location.search);
        setId(userId);
        setEmail(email);
        setOldEmail(email)
        setUsername(username);
        setOldUsername(username)
        setIsAdmin(admin);
        setOldIsAdmin(admin);
    }, []);

    const getToken = async (event) => {
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
            if (event === "username"){
                if (_userName !== oldUserName){
                    handleEditUsername(token);
                }
            }
            if(event === "admin"){
                if(isAdmin !== oldIsAdmin){
                    handleEditAdmin(token);
                } 
            }
            if(event === "delete"){
                handleDeleteUser(token);
                
            }
            
        })
        .catch(error => console.log('error', error));
        
    }  

    const handleDeleteUser = (_token) =>{
        console.log(id);
        var myHeaders = new Headers();
        myHeaders.append("authorization", _token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "__cfduid=d083a3aed605691cdf60e93ad5170b9291604625828; did=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso; did_compat=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        let _url = "https://dev-3qxptrmu.us.auth0.com/api/v2/users/auth0|" + id
        fetch(_url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        console.log("TERMINA ELIMINACION")
        history.push('/users')
        history.push('/admin')  
        history.push('/users')    
    }

    const handleGoBack = () => {
        history.push('/users')
    }

    const handleEditUsername = (_token) => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", _token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "__cfduid=d083a3aed605691cdf60e93ad5170b9291604625828; did=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso; did_compat=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso");
        var raw = JSON.stringify({"user_metadata":{"username":_userName}});
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let _url = "https://dev-3qxptrmu.us.auth0.com/api/v2/users/auth0|" + id
        fetch(_url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }


    const handleEditAdmin = (_token) => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", _token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "__cfduid=d083a3aed605691cdf60e93ad5170b9291604625828; did=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso; did_compat=s%3Av0%3Ab86c6e50-1fce-11eb-bf84-9ffd0b850c2b.ednZdSdJix1z3kGNvZ5l4J%2BGcZg2aaEyJTM6v5YMrso");
        var raw = JSON.stringify({"user_metadata":{"is_admin": isAdmin}});
        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        let _url = "https://dev-3qxptrmu.us.auth0.com/api/v2/users/auth0|" + id
        fetch(_url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }


     

    return (
        <div className='Full'>
            <div className='Console'>
                <div className={'Bar'}>
                    <div className={'Left'}>
                        <div><button type="submit" onClick={(event) => getToken("delete")}>Delete User</button></div>
                    </div>
                    <div className={'Right'}>
                        <h3> <button type="submit" onClick={handleGoBack}>Go Back</button></h3>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div>
                    User ID: {id}<br></br><br></br>
                    Email: {_email}<br></br>
                    <br></br>
                    Username: <input className='Input' placeholder = {_userName} type ="text" onChange={(event) => setUsername(event.target.value)}/><button type="submit" onClick={(event) => getToken("username")}> Change</button><br></br><br></br>
                    Admin: <input className='Input' placeholder = {isAdmin} type ="text" onChange={(event) => setIsAdmin(event.target.value)}/><button type="submit" onClick={(event) => getToken("admin")}> Change</button><br></br><br></br>
                   
                </div>
            </div>
        </div>
    )
}

export default Profile;
