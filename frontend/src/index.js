import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './componets/NavBar';
import Footer from './componets/Footer';
// import reportWebVitals from './reportWebVitals';
import AuthProvider from './auth/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <NavBar />
    <App />
    <Footer />
    </BrowserRouter>
    </AuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
