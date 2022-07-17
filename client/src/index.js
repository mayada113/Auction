import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import reportWebVitals from './reportWebVitals';
import { AuthStore as authStore } from './stores/AuthStore'
import { ItemsStore as itemsStore } from './stores/ItemsStore'

const AuthStore = new authStore()
const ItemsStore = new itemsStore()

const stores = {
  AuthStore,
  ItemsStore,
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...stores}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
