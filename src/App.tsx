import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quesos from './components/quesos';
import Home from './components/home';
import Carrito from './components/carrito';
import QuesosxCategoria from './components/quesosxcategoria';
import NavbarEx from './layouts/navbar';
import Footer from './layouts/footer';
import Buscar from './components/buscar';
import { ShoppingCartProvider } from './context/carrito-contexto';
import QuesoIndividual from './components/queso';
import Profile from './components/perfil/profile';
import EditProfile from './components/perfil/editprofile';
import CreateProfile from './components/perfil/createprofile';

function App() {

  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <ShoppingCartProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <NavbarEx updateUser={setLoggedUser} loggedUser={loggedUser}/> }>
              <Route index element={ <Home /> }/>
              <Route path='quesos' element={ <Quesos /> }/>
              <Route path='quesos/page/:number' element={ <Quesos /> }/>

              <Route path='quesos/:nombre' element={<QuesoIndividual/>}/>

              <Route path='carrito' element={ <Carrito /> }/>

              <Route path='quesos/categoria/:tipo_de_queso' element={ <QuesosxCategoria /> } />
              <Route path='quesos/categoria/:tipo_de_queso/page/:number' element={ <QuesosxCategoria /> } />

              <Route path='quesos/buscar/:queso_a_buscar' element={<Buscar/>}/>
              <Route path='quesos/buscar/:queso_a_buscar/page/:number' element={<Buscar/>}/>

              <Route path='perfil' element={ <Profile loggedUser={loggedUser}/> }/>
              <Route path='perfil/crear' element={ <CreateProfile/> }/>
              <Route path='perfil/editar' element={ <EditProfile updateUser={setLoggedUser} loggedUser={loggedUser}/> }/>

              [//cuando ponen una ruta mal en el navegador siempre lleva a la vista principal]
              <Route path='*' element={ <Navigate replace to="/" />}/> 
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </ShoppingCartProvider>
  );  
}

export default App;
