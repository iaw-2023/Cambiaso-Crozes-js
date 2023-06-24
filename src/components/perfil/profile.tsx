import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Row } from 'react-bootstrap';
import Loading from '../../layouts/loading';
import Cliente from '../../models/cliente';
import { Link, Navigate } from "react-router-dom";
import HistorialProfile from './historialprofile';
import EditProfile from './editprofile';
import { useLoggedUser } from '../../context/usuario-contexto';

const Profile = () => {

  const {
    isLoggedUser,
    getLoggedUser,
    isLoggedIn
  } = useLoggedUser();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [user, setUser] = useState<Cliente>({
    'id':0,
    'nombre':"",
    'apellido':"",
    'domicilio':"",
    'ciudad':"",
    'email':"",
  });
  const [historial, setHistorial] = useState([]);

  const [loadingUser, isLoadingUser] = useState(false);
  const [loadingHistorial, isLoadingHistorial] = useState(false);

  const getDataFromAPI = async() => {
    isLoadingUser(true);
    if(isLoggedUser()) {
      const token = await getAccessTokenSilently();
      const url = process.env.REACT_APP_MY_ENV+"clientes/buscar/"+getLoggedUser().email;
      await fetch(url,  {
          method: "GET",
          headers: {
              "X-CSRF-TOKEN": "",
              accept: "application/json",
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
          },
      }).then(response => {
        if(!response.ok) throw new Error("No se ha encontrado el cliente, debe crearlo");
        return response.json();
      }).then(data => {
        setUser(data);
        isLoadingUser(false);
      }).catch(error => {
        isLoadingUser(false);
      });
    }
  }

  const getHistorial = async() => {
    isLoadingHistorial(true);
    if(isLoggedUser()) {
      const urlHistorial = process.env.REACT_APP_MY_ENV+"clientes/"+getLoggedUser().email+"/pedidos";
      const token = await getAccessTokenSilently();
      await fetch(urlHistorial,  {
        method: "GET",
        headers: {
            "X-CSRF-TOKEN": "",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
      }).then(response => {
        if(!response.ok) throw new Error("No se han encontrado pedidos del cliente");
        return response.json();
      }).then(data => {
        setHistorial(data);
        isLoadingHistorial(false);
      }).catch(error => {
        isLoadingHistorial(false);
      });
    }
  }

  useEffect( () => {
    if(isLoggedUser()) {
      getDataFromAPI();
      getHistorial();
    }
  }, []);

  return (
    <>
      { loadingUser || loadingHistorial ? (
        <Loading></Loading>
      ): (
        <>
        { isLoggedIn ? (
          <>
            { isLoggedUser() ? (
              <Row xs={1} md={2} className='row-perfil'>
                <Container className='container-perfil'>
                  <h1 className="titulo">Perfil</h1>
                  <EditProfile
                    clienteHook={{ cliente: user, setCliente: setUser}}
                  />
                </Container>
                <Container className='container-perfil'>
                  <h1 className="titulo">Historial</h1>
                  <HistorialProfile 
                    historial = {historial}
                  />
                </Container>
              </Row>
            ): (
              
              <Navigate to="/perfil/crear"></Navigate> 
            )}
          </>
        ):(
          <Navigate to="/"></Navigate> 
        )}
        </>
      )}
    </>
  );
};

export default Profile;