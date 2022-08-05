import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './stores/UserStore/UserLogin'
const store = configureStore({
  reduces: { 
    userReducer,},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode store={store}>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
