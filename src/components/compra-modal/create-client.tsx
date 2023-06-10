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
            setSeccion(3);
        }
    }

    return (
        <Form>
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
                    <FloatingLabel label="Apellido" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su apellido"
                        value={cliente.apellido}
                        onChange={(e) => {setCliente({...cliente, apellido: e.target.value}); setPedido({...pedido, cliente_apellido: e.target.value});}}
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
                    <FloatingLabel label="Ciudad" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su ciudad"
                        value={cliente.ciudad}
                        onChange={(e) => { setCliente({...cliente, ciudad: e.target.value}); setPedido({...pedido, cliente_ciudad: e.target.value});}}
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
                    <FloatingLabel label="Domicilio" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su domicilio"
                        value={cliente.domicilio}
                        onChange={(e) => {setCliente({...cliente, domicilio: e.target.value}); setPedido({...pedido, cliente_domicilio: e.target.value});}}
                        isInvalid={errorMessageDomicilio !== ""}
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