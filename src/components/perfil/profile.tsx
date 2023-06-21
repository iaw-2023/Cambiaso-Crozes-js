import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row } from 'react-bootstrap';
import Loading from '../../layouts/loading';
import Cliente from '../../models/cliente';
import { Navigate, useParams } from "react-router-dom";
import DataPagination from "../../models/dataPagination";
import HistorialProfile from './historialprofile';
import EditProfile from './editprofile';

const Profile = (props:any) => {

  const loggedUser = props.loggedUser;

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

  const [loading, isLoading] = useState(false);

  const getDataFromAPI = async() => {
    isLoading(true);
    const token = await getAccessTokenSilently();
    const url = process.env.REACT_APP_MY_ENV+"clientes/buscar/"+loggedUser.email;
    await fetch(url,  {
        method: "GET",
        headers: {
            "X-CSRF-TOKEN": "",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    }).then(async (response) => {
        if(response.status === 200){
          const dataUser = await response.json();
          setUser(dataUser);
          isLoading(false);
        } else {
          const error = await response.json();
          isLoading(false);
        }
    });
   
  }

  const getHistorial = async() => {
    isLoading(true);
    const urlHistorial = process.env.REACT_APP_MY_ENV+"clientes/"+loggedUser.email+"/pedidos";
    const token = await getAccessTokenSilently();
    await fetch(urlHistorial,  {
      method: "GET",
      headers: {
          "X-CSRF-TOKEN": "",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
      },
    }).then(async (response) => {
        if(response.status === 200){
          const dataHistorial = await response.json();
          setHistorial(dataHistorial);
          isLoading(false);
        } else {
          const error = await response.json();
          isLoading(false);
        }
    });
  }

  useEffect( () => {
    if(loggedUser){
      getDataFromAPI();
      getHistorial();
    }
  }, []);

  return (
    <>
      { loading ? (
        <Loading></Loading>
      ): (
        <>
          { isAuthenticated && loggedUser ? (
            <Row xs={1} md={2} className='row-perfil'>
              <Container className='container-perfil'>
                <h1 className="titulo">Perfil</h1>
                <EditProfile
                  clienteHook={{ cliente: user, setCliente: setUser}} updateUser = {props.updateUser} loggedUser = {loggedUser}
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
            <>
              <Navigate to="/perfil/crear"></Navigate>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;