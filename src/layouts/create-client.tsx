import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type CreateClientProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
    clienteOriginalHook: { clienteOriginal: any; setClienteOriginal: (clienteOriginal: any) => void};
};


function CreateClient ({ pedidoHook, seccionHook, clienteHook, clienteOriginalHook }: CreateClientProps) {

    const {pedido, setPedido} = pedidoHook;
    const {seccion, setSeccion} = seccionHook;
    const {cliente, setCliente} = clienteHook;
    const {clienteOriginal, setClienteOriginal} = clienteOriginalHook;

    const [errorMessageNombre, setErrorMessageNombre] = useState("");
    const [errorMessageApellido, setErrorMessageApellido] = useState("");
    const [errorMessageDomicilio, setErrorMessageDomicilio] = useState("");
    const [errorMessageCiudad, setErrorMessageCiudad] = useState("");

    const handleSubmitCliente = () => {
        (cliente.nombre === "") ? setErrorMessageNombre("El nombre no puede ser vacío."): setErrorMessageNombre("");

        (cliente.apellido === "") ? setErrorMessageApellido("El apellido no puede ser vacío."): setErrorMessageApellido("");
        
        (cliente.ciudad === "") ? setErrorMessageCiudad("La ciudad no puede ser vacía."): setErrorMessageCiudad("");
        
        (cliente.domicilio === "") ? setErrorMessageDomicilio("El domicilio no puede ser vacío."): setErrorMessageDomicilio("");
        
        if (errorMessageNombre === "" && errorMessageApellido === "" && errorMessageCiudad === "" && errorMessageDomicilio === "") {
            setSeccion(3);
        } 
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={cliente.email}
                    disabled
                />
            </Form.Group>
   
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={cliente.nombre}
                        isInvalid={errorMessageNombre !== ""}
                        onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageNombre}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su apellido"
                        value={cliente.apellido}
                        isInvalid={errorMessageApellido !== ""}
                        onChange={(e) => setCliente({...cliente, apellido: e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageApellido}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ciudad</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su ciudad"
                        value={cliente.ciudad}
                        isInvalid={errorMessageCiudad !== ""}
                        onChange={(e) => setCliente({...cliente, ciudad: e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageCiudad}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Domicilio</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su domicilio"
                        value={cliente.domicilio}
                        isInvalid={errorMessageDomicilio !== ""}
                        onChange={(e) => setCliente({...cliente, domicilio: e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageDomicilio}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Button className="boton-form-pedido" variant="outline-dark" onClick={() => {setSeccion(1)}}>
                Anterior
            </Button>
            <Button className="boton-form-pedido" variant="outline-warning" onClick={handleSubmitCliente}>
                Siguiente
            </Button>
            
        </Form>
    )
}

export default CreateClient;