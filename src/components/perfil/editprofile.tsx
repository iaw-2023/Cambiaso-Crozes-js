import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import Cliente from '../../models/cliente';
import Loading from '../../layouts/loading';
import { useLoggedUser } from '../../context/usuario-contexto';

type EditProps = {
    clienteHook: { cliente: Cliente; setCliente: (client: Cliente) => void};
};
const EditProfile = ({clienteHook}: EditProps) => {

    const {
        setUserAsLogged
    } = useLoggedUser();

    const { getAccessTokenSilently } = useAuth0();
    
    const [showAlert, setShowAlert] = useState(false);
    const [loading, isLoading] = useState(false);

    const {cliente, setCliente} = clienteHook;
    
    const [errorMessageNombre, setErrorMessageNombre] = useState("");
    const [errorMessageApellido, setErrorMessageApellido] = useState("");
    const [errorMessageDomicilio, setErrorMessageDomicilio] = useState("");
    const [errorMessageCiudad, setErrorMessageCiudad] = useState("");

    const handleSubmitCliente = (event:any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        var patternStrings = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        var patternDomicilio = /^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s]+$/; 

        (cliente.nombre === "" || !patternStrings.test(cliente.nombre)) ? setErrorMessageNombre("El nombre no tiene un formato válido."): setErrorMessageNombre("");
        (cliente.apellido === "" || !patternStrings.test(cliente.apellido)) ? setErrorMessageApellido("El apellido no tiene un formato válido."): setErrorMessageApellido("");
        (cliente.ciudad === "" || !patternStrings.test(cliente.ciudad)) ? setErrorMessageCiudad("La ciudad no tiene un formato válido."): setErrorMessageCiudad("");
        (cliente.domicilio === "" || !patternDomicilio.test(cliente.domicilio)) ? setErrorMessageDomicilio("El domicilio no tiene un formato válido."): setErrorMessageDomicilio("");

        if((cliente.nombre.trim() !== '' && patternStrings.test(cliente.nombre)) && 
            (cliente.apellido.trim() !== '' && patternStrings.test(cliente.apellido)) && 
                (cliente.ciudad.trim() !== '' && patternStrings.test(cliente.ciudad)) && 
                    (cliente.domicilio.trim() !== '' && patternDomicilio.test(cliente.domicilio))){
                        handleEditCliente();
        }
    }

    const handleEditCliente = async () => {
        isLoading(true);
        const token = await getAccessTokenSilently();
        const url = process.env.REACT_APP_MY_ENV+"clientes/"+cliente.id;
        await fetch(url,  {
            method: "PUT",
            headers: {
                "X-CSRF-TOKEN": "",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(cliente)
        }).then(async (response) => {
            if(response.status === 200) {
                setUserAsLogged(cliente);
                // Sus datos se actualizaron correctamente!
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000); 
            
                isLoading(false);
            } else {
                isLoading(false);
            }
        });
    }

    return (
        <Form className='form-perfil'>
            <Form.Group>
                <FloatingLabel label="Email" className="mb-3 text-black">
                <Form.Control
                    type="email"
                    value={cliente.email}
                    disabled
                />
                </FloatingLabel>
            </Form.Group>
 
            <Form.Group>
                <InputGroup>
                    <FloatingLabel label="Nombre" className="mb-3 text-black">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={cliente.nombre}
                        onChange={(e) => {setCliente({...cliente, nombre: e.target.value})}}
                        isInvalid={errorMessageNombre !== ""}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageNombre}
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <FloatingLabel label="Apellido" className="mb-3 text-black">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su apellido"
                        value={cliente.apellido}
                        onChange={(e) => {setCliente({...cliente, apellido: e.target.value});}}
                        isInvalid={errorMessageApellido !== ""}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageApellido}
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <FloatingLabel label="Ciudad" className="mb-3 text-black">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su ciudad"
                        value={cliente.ciudad}
                        onChange={(e) => { setCliente({...cliente, ciudad: e.target.value});}}
                        isInvalid={errorMessageCiudad !== ""}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageCiudad}
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <FloatingLabel label="Domicilio" className="mb-3 text-black">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su domicilio"
                        value={cliente.domicilio}
                        onChange={(e) => {setCliente({...cliente, domicilio: e.target.value});}}
                        isInvalid={errorMessageDomicilio !== ""}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageDomicilio}
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
            </Form.Group>
            <div>
                { loading ? (
                    <Loading></Loading>
                    ): (
                    <>
                    <Button className="boton-int-modal" variant="outline-warning" onClick={handleSubmitCliente}>
                        Actualizar
                    </Button>
                    {showAlert && (
                        <Alert className="floating-alert" variant="warning" onClose={() => {setShowAlert(false)}} dismissible>
                            Sus datos se han actualizado correctamente!
                        </Alert>
                    )}
                    </>
                )}
            </div>
            
        </Form>
    )
};

export default EditProfile;