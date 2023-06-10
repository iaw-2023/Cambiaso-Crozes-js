import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateClient from './create-client';
import SearchClient from './search-client';
import ConfirmOrder from './confirm-order';
import EndOrder from './end-order';

function ConfirmarPedido() {
    const [show, setShow] = useState(false);

    const [pedido, setPedido] = useState({
        fecha: "",
        precio_total: 0,
        cliente_id: 0,
        cliente_nombre: "",
        cliente_apellido: "",
        cliente_ciudad: "",
        cliente_domicilio: "",
        quesos: {}
    });

    const [cliente, setCliente] = useState({
        id: "",
        nombre: "",
        apellido: "",
        ciudad: "",
        domicilio: "",
        email: ""
    });

    const handleClose = () => {
        setShow(false);
        setSeccion(1);
    };
    const handleShow = () => setShow(true);

    const [seccion, setSeccion] = useState(1);

    return (
        <>
        <Button className="boton-modal" variant="outline-warning" onClick={handleShow}>
            Finalizar Compra
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static" >
            <Modal.Header>
                <Modal.Title><h1>Confirmar compra</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {seccion === 1 && (
                    <SearchClient 
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} showHook={{ show, setShow }}
                    />
                    
                )}
                {seccion === 2 && (
                    <CreateClient
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} showHook={{ show, setShow }}
                    />
                )}
                {seccion === 3 && (
                    <ConfirmOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} showHook={{ show, setShow }}
                    />
                )}
                {seccion === 4 && (
                    <EndOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} showHook={{ show, setShow }}
                    />
                )}
            </Modal.Body>
        </Modal>
        </>
    );
}
export default ConfirmarPedido;