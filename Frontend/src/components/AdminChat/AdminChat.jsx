import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import {
    url_display_chat, 
    url_send_message, 
    url_delete_all_messages, 
    url_delete_room, 
    url_delete_a_message,
    url_edit_a_message,
    url_get_old_message
} from "./../Routes";
import { useHistory } from 'react-router-dom';


import '../Chat/Chat.css'
import '../general.css'
import './AdminChat.css'

import Input from '../Input/Input';
import AdminMessagesView from '../AdminMessagesView/AdminMessagesView';
let socket;



const AdminChat = ({ location }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');
    const [originalMessage, setOriginalMessage] = useState('');
    const ENDPOINT = 'ec2-18-219-25-136.us-east-2.compute.amazonaws.com:5000'
    

    useEffect(() => {
        const {room, name} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const url_ = url_display_chat + room;
        fetch(url_, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    const list = data.messages
                    list.sort((a,b) => {
                        if(a.created_at > b.created_at){
                            return 1
                        }else{
                            return -1
                        }
                    })
                    setMessages(list);
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
            })

    }, [room]);

    

    const sendMessage = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("user_id", window.localStorage.getItem('userId'));
        urlencoded.append("room_id", room);
        urlencoded.append("message", message);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        fetch(url_send_message, requestOptions)
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
        })
        window.location.reload()        
    }

    const handleExitChat = () => {
        history.push('/roomspanel')
    }

    const handleDeleteMessage = (event) => {
        event.preventDefault();
        let message_id = selectedMessage.split('|')[0];
        console.log("id: ", message_id)
        console.log("delete ", selectedMessage)

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        let url_detete = url_delete_a_message + message_id
        fetch(url_detete, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        window.location.reload()


    }

    const handleEditMessage = () => {
        let message_id = selectedMessage.split('|')[0];
        let message_content = selectedMessage.split(':')[1];
        console.log("mesage id: ", message_id);
        console.log("mesage content: ", message_content);
        var new_message = prompt("EDIT THE MESSAGE", message_content);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"message":new_message});

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        let url_edit = url_edit_a_message + message_id;
        fetch(url_edit, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        window.location.reload()
    }

    const handleSelectMessage = (event) => {
        console.log(event.target.value)
        event.preventDefault();
        setSelectedMessage(event.target.value)
    }

    const handleDoubleClickedMessage = (event) =>{
        let messageId = event.target.value.split('|')[0];

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
    };
        let _url = url_get_old_message + messageId
        fetch(_url, requestOptions)
            .then(response => response.json())
            .then(result => console.log(setOriginalMessage(result.oldmessage)))
            .catch(error => console.log('error', error));
        
    }

    const handleDeleteRoom = (event) => {
        event.preventDefault();
        var formdata = new FormData();
        var requestOptionsAllMessages = {
        method: 'DELETE',
        body: formdata,
        redirect: 'follow'
        };
        let msgs_url = url_delete_all_messages + room;
        fetch(msgs_url, requestOptionsAllMessages)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        var requestOptionsRoom = {
            method: 'DELETE',
            redirect: 'follow'
          };
        let room_url = url_delete_room + room;
        fetch(room_url, requestOptionsRoom)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        history.push('/roomspanel')
        window.location.reload()
    }

    return (
        <div className='Full'>
        <div className='Console'>
            <div className={'ChatContainer'}>
                <div className={'Bar'}>
                    <div className={'Left'}>
                        <div><button type="submit" onClick={handleDeleteRoom}>Delete {name}</button></div>
                    </div>
                    <div className={'Right'}>
                        <h3> <button type="submit" onClick={handleExitChat}> Exit Room</button></h3>
                    </div>
                </div>
                <div id="message-list" onDoubleClick={handleDoubleClickedMessage}>
                    <AdminMessagesView messages={messages} handleSelectMessage={handleSelectMessage} />
                </div>
                <div className={'Bar'}>
                    <div className={'DownLeft'}>
                        <div><button type="submit" onClick={handleDeleteMessage}> Delete Message </button></div>
                    </div>
                    <div className={'DownRight'}>
                        <div><button type="submit" onClick={handleEditMessage}> Edit Message </button></div>
                    </div>
                </div>
                <br></br>
                <div id="old_message">Original message: {originalMessage}</div>
            </div>
        </div>
    </div>
    )
}

export default AdminChat;
