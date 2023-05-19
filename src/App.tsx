import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quesos from './components/quesos'
import Home from './components/home'
import NavbarEx from './layouts/navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <NavbarEx /> }>
            <Route index element={ <Home /> }/>
            <Route path='quesos' element={ <Quesos /> }/>

            [//cuando ponen una ruta mal en el navegador siempre lleva a la vista principal]
            <Route path='*' element={ <Navigate replace to="/" />}/> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );  
}

export default App;
