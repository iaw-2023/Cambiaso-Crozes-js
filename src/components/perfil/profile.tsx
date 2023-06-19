import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Stack } from 'react-bootstrap';
import Loading from '../../layouts/loading';

const Profile = (props:any) => {

  const loggedUser = props.loggedUser;

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      { isLoading ? (
        <Loading></Loading>
      ): (
        <>
          { isAuthenticated ? (
            <Container className="quesos-container">
              <Container>
                <h1 className="titulo">Perfil</h1>
                {/* <h3>Nombre: {loggedUser.nombre}</h3>
                <h3>Apellido: {loggedUser.apellido}</h3> */}
                {user !== undefined && (
                <h3>Email: {user.email}</h3>
                )}
                {/* <h3>Ciudad: {loggedUser.ciudad}</h3>
                <h3>Domicilio: {loggedUser.domicilio}</h3> */}
              </Container>
              <h1 className="titulo">Historial</h1>
              <Container className="border-dashed border-2 border-gray-200 rounded container-info-pedido">
                <Stack gap={2}>
                    
                </Stack>
              </Container>
            </Container>
          ): (
            <></>
          )}
        </>
      )
      }
    </>
  );
};

export default Profile;