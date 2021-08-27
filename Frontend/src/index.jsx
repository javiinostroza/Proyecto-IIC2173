import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import { url_auth} from "./components/Routes";

ReactDOM.render(
    <Auth0Provider
        domain="dev-3qxptrmu.us.auth0.com"
        clientId="qUyZLb2NDbL2pjrMZIt6c13JjBxZ5DoG"
        redirectUri={url_auth}
        audience="https://dev-3qxptrmu.us.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
    >
        <App />
    </Auth0Provider>
    , document.querySelector('#root'));

