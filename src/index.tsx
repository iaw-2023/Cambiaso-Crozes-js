import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <React.StrictMode>
    <Auth0Provider 
        domain={domain !== undefined ? domain : ""}
        clientId={client_id !== undefined ? client_id : ""}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience:"saycheese-api",
        }}
        >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
