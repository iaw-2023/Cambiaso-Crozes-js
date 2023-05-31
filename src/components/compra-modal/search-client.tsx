import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import Loading from "../../layouts/loading";

type SearchClientProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
    showHook: { show: boolean; setShow: (show: boolean) => void};
};

function SearchClient ({ pedidoHook, seccionHook, clienteHook, showHook }: SearchClientProps) {
    
    const {pedido, setPedido} = pedidoHook;
    const {setSeccion} = seccionHook;
    const {cliente, setCliente} = clienteHook;
    const {show, setShow} = showHook;

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoaded, setLoaded] = useState(true);
    const [validated, setValidated] = useState(false);

    const handleEmailChange = (e:any) => {
        setValidated(false);
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

    useEffect(() => {
        var pattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        setValidated(false);
        if (email === "") {
            setErrorMessage("El email no puede ser vacío.");
        } else if (!pattern.test(email)) {
            setErrorMessage("El email no tiene un formato válido.");
        } else {
            setErrorMessage("");
            setValidated(true);
        }
    }, [email]);

    const handleSubmitEmail = async() => {
        setLoaded(false);
        const url = process.env.REACT_APP_MY_ENV + 'clientes/buscar/' + email;
        const response = await fetch(url);
        const dataCliente = await response.json();
        if (dataCliente.length > 0) {
            // existe el cliente
            setCliente(dataCliente[0]);
            setPedido({
                ...pedido,
                cliente_id: dataCliente[0].id,
                cliente_nombre: dataCliente[0].nombre,
                cliente_apellido: dataCliente[0].apellido,
                cliente_ciudad: dataCliente[0].ciudad,
                cliente_domicilio: dataCliente[0].domicilio,
            });
        } else {
            // no existe el cliente
            setCliente({
                ...cliente,
                email: email
            });
        }
        setLoaded(true);
        setSeccion(2);
    }

    return (
        <>
            {isLoaded ? (
                <Form>
                    <Form.Group as={Col} md="12" controlId="formEmail">
                        <InputGroup>
                            <FloatingLabel label="Email" className="mb-3">
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
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                    <div className="div-botones-modal">
                        <Button className="boton-int-modal" variant="outline-danger" onClick={() => setShow(false)}>
                            Cerrar
                        </Button>
                        <Button className="boton-int-modal" variant="outline-warning" onClick={handleSubmitEmail} disabled={!validated}>
                            Siguiente
                        </Button>
                    </div>
                </Form>
            ):(
                <Loading></Loading>
            )}
        </>
    )
}
export default SearchClient;