import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quesos from './components/quesos';
import Home from './components/home';
import Carrito from './components/carrito';
import QuesosxCategoria from './components/quesosxcategoria';
import NavbarEx from './layouts/navbar';
import Footer from './layouts/footer';
import Queso from './components/queso';
import Buscar from './components/buscar';

function App() {
 return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <NavbarEx /> }>
            <Route index element={ <Home /> }/>
            <Route path='quesos' element={ <Quesos /> }/>
            <Route path='quesos/page/:number' element={ <Quesos /> }/>

            <Route path='quesos/:nombre' element={<Queso/>}/>

            <Route path='carrito' element={ <Carrito /> }/>

            <Route path='quesos/categoria/:tipo_de_queso' element={ <QuesosxCategoria /> } />
            <Route path='quesos/categoria/:tipo_de_queso/page/:number' element={ <QuesosxCategoria /> } />

            <Route path='quesos/buscar/:queso_a_buscar' element={<Buscar/>}/>
            <Route path='quesos/buscar/:queso_a_buscar/page/:number' element={<Buscar/>}/>

            [//cuando ponen una ruta mal en el navegador siempre lleva a la vista principal]
            <Route path='*' element={ <Navigate replace to="/" />}/> 
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );  
}

export default App;
