import React, { useState }from "react";
import { useHistory } from 'react-router-dom';
import {url_named_user} from "../Routes"

import './Register.css';
import '../general.css'

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [room, setRoom] = useState('');

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
        window.localStorage.removeItem('userId');
        history.push('/');
    }
    const handleBackClick = () => {
        window.localStorage.removeItem('userId');
        history.push('/');
    }

    return (
        <div className={'Full'}>
            <div className={'Console'}>
                <div className={'Inputs'}>
                    <h1> Register </h1>
                    <div>
                    <input className='JoinInput' placeholder = "Name" type ="text" onChange={(event) => setName(event.target.value)}/>
                    <input className='JoinInput' placeholder = "Email" type ="text" onChange={(event) => setEmail(event.target.value)}/>
                    <input className='JoinInput' placeholder = "Password" type ="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" onClick={handleRegisterClick}> Sign Up</button>
                    <br></br>
                    <button type="submit"  onClick={handleBackClick}> Back</button><br></br>
                </div>
            </div>
        </div>

    ) 
}

export default Register;