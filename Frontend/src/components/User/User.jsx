import React from 'react';


const User = ({users, handleEnterProfile}) => (
    <select id="user-list" size="700" onChange={(event) => handleEnterProfile(event)} >
        {users.map((item) => <option key={item.identities.user_id}>Id:{item.identities[0].user_id} | Email:{item.email} | Username:{item.user_metadata.username} | Admin:{item.user_metadata.is_admin}</option>)}
    </select>
   
)

export default User;