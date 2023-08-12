import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Style
import "./assets/sass/main.scss"
// Router
import { BrowserRouter } from 'react-router-dom';
// Aos
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
