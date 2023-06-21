import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConfirmOrder from './confirm-order';
import EndOrder from './end-order';
import PayOrder from './pay-order';

function ConfirmarPedido(props:any) {
    const [show, setShow] = useState(false);

    const [pedido, setPedido] = useState({
        fecha: "",
        precio_total: 0,
        cliente_id: props.loggedUser.id,
        quesos: {}
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
                    <ConfirmOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} showHook={{ show, setShow }} loggedUser={props.loggedUser}
                    />
                )}
                {seccion === 2 && (
                    <PayOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} showHook={{ show, setShow }} loggedUser={props.loggedUser}
                    />
                )}
                {seccion === 3 && (
                    <EndOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }}
                    />
                )}
            </Modal.Body>
        </Modal>
        </>
    );
}
export default ConfirmarPedido;