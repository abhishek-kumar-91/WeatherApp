import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CardDetails from '../src/components/CardDetails'; 
import './index.css';
import Header from './components/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/card/:id" element={<CardDetails />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
