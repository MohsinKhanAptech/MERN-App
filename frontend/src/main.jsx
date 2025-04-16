import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './main.css';

import App from './App';
import User from './User';
import ToastProvider from './Components/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </ToastProvider>
  </BrowserRouter>
);
