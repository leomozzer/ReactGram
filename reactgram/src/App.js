import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/header/Header'
import AppRoutes from './components/routes/Routes'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
