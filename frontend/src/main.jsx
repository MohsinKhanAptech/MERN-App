import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './main.css';

import ToastProvider from './Components/ToastProvider';
import App from './App';
import User from './User';
import Role from './Role';
import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/user" element={<User />} />
        <Route path="/role" element={<Role />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ToastProvider>
  </BrowserRouter>
);
