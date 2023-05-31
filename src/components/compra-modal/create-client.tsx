import { useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";

type CreateClientProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
    showHook: { show: boolean; setShow: (show: boolean) => void};
};

function CreateClient ({ pedidoHook, seccionHook, clienteHook, showHook }: CreateClientProps) {

    const {pedido, setPedido} = pedidoHook;
    const {setSeccion} = seccionHook;
    const {cliente, setCliente} = clienteHook;
    const {show, setShow} = showHook;

    const [errorMessageNombre, setErrorMessageNombre] = useState(' ');
    const [errorMessageApellido, setErrorMessageApellido] = useState(' ');
    const [errorMessageDomicilio, setErrorMessageDomicilio] = useState(' ');
    const [errorMessageCiudad, setErrorMessageCiudad] = useState(' ');
    const [validated, setValidated] = useState(false);

    const handleSubmitCliente = (event:any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        (cliente.nombre === "") ? setErrorMessageNombre("El nombre no puede ser vacío."): setErrorMessageNombre("");
        (cliente.apellido === "") ? setErrorMessageApellido("El apellido no puede ser vacío."): setErrorMessageApellido("");
        (cliente.ciudad === "") ? setErrorMessageCiudad("La ciudad no puede ser vacía."): setErrorMessageCiudad("");
        (cliente.domicilio === "") ? setErrorMessageDomicilio("El domicilio no puede ser vacío."): setErrorMessageDomicilio("");
    
        setValidated(true);

        if(cliente.nombre.trim() !== '' && cliente.apellido.trim() !== '' && cliente.ciudad.trim() !== '' && cliente.domicilio.trim() !== ''){
            setSeccion(3);
        }
    }

    return (
        <Form noValidate validated={validated} >
            <Form.Group>
                <FloatingLabel label="Email" className="mb-3">
                <Form.Control
                    type="email"
                    value={cliente.email}
                    disabled
                />
                </FloatingLabel>
            </Form.Group>
   
            <Form.Group>
                <InputGroup>
                    <FloatingLabel label="Nombre" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={cliente.nombre}
                        onChange={(e) => {setCliente({...cliente, nombre: e.target.value}); setPedido({...pedido, cliente_nombre: e.target.value});}}
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
                    <FloatingLabel label="Apellido" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su apellido"
                        value={cliente.apellido}
                        onChange={(e) => {setCliente({...cliente, apellido: e.target.value}); setPedido({...pedido, cliente_apellido: e.target.value});}}
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
                    <FloatingLabel label="Ciudad" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su ciudad"
                        value={cliente.ciudad}
                        onChange={(e) => { setCliente({...cliente, ciudad: e.target.value}); setPedido({...pedido, cliente_ciudad: e.target.value});}}
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
                    <FloatingLabel label="Domicilio" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su domicilio"
                        value={cliente.domicilio}
                        onChange={(e) => {setCliente({...cliente, domicilio: e.target.value}); setPedido({...pedido, cliente_domicilio: e.target.value});}}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageDomicilio}
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
            </Form.Group>
            <div className="div-botones-modal">
                <Button className="boton-int-modal" variant="outline-dark" onClick={() => {setSeccion(1)}}>
                    Anterior
                </Button>
                <Button className="boton-int-modal" variant="outline-danger" onClick={() => setShow(false)}>
                    Cerrar
                </Button>
                <Button className="boton-int-modal" variant="outline-warning" onClick={handleSubmitCliente}>
                    Siguiente
                </Button>
            </div>
            
        </Form>
    )
}

export default CreateClient;