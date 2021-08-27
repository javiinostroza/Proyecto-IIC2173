import React from 'react';
import '../Messages/Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';

// const AdminMessagesView = ({ messages, handleDeleteMessage}) => (
//     <select id="message-list" size="23" onChange={(event) => handleDeleteMessage(event)} >
//         {messages.map((message, i) => <option key={i}>{message}</option>)}
//     </select>

// )

const AdminMessagesView = ({ messages, handleSelectMessage}) => (
    <select id="chat-edit" size="23" onChange={(event) => handleSelectMessage(event)} >
        {messages.map((message, i) => <option key={i}>{message.id}| {message.username}: {message.message}</option>)}
    </select>

)
export default AdminMessagesView;