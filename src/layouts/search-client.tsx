import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

type SearchClientProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
    clienteOriginalHook: { clienteOriginal: any; setClienteOriginal: (clienteOriginal: any) => void};
};

function SearchClient ({ pedidoHook, seccionHook, clienteHook, clienteOriginalHook }: SearchClientProps) {
    
    const {pedido, setPedido} = pedidoHook;
    const {seccion, setSeccion} = seccionHook;
    const {cliente, setCliente} = clienteHook;
    const {clienteOriginal, setClienteOriginal} = clienteOriginalHook;

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
        setCliente({
            id: "",
            nombre: "",
            apellido: "",
            ciudad: "",
            domicilio: "",
            email: ""
        })
    };

    const validarEmail = () => {
        var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email === "") {
            setErrorMessage("El email no puede ser vacío.");
        } else if (!pattern.test(email)) {
            setErrorMessage("El email no tiene un formato válido.");
        } else {
            setErrorMessage("");
            handleSubmitEmail();
        }
    }

    const handleSubmitEmail = async() => {
        const url = process.env.REACT_APP_MY_ENV + 'clientes/buscar/' + email;
        const response = await fetch(url);
        const dataCliente = await response.json();
        if (dataCliente.length > 0) {
            // existe el cliente
            setCliente(dataCliente[0]);
            setClienteOriginal(dataCliente[0]);
            setPedido({
                ...pedido,
                cliente_id: dataCliente[0].id,
            });
        } else {
            setCliente({
                ...cliente,
                email: email
            });
        }
        setSeccion(2);
    }

    return (
        <>
            <Form>
                <Form.Group as={Col} md="12" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={errorMessage !== ""}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorMessage}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Button className="boton-form-pedido" variant="outline-warning" onClick={validarEmail}>
                    Siguiente
                </Button>
            </Form>
        </>
    )
}
export default SearchClient;