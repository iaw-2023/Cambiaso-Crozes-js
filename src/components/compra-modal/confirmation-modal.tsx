import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ConfirmOrder from './confirm-order';
import EndOrder from './end-order';
import PayOrder from './pay-order';
import { useLoggedUser } from '../../context/usuario-contexto';

function ConfirmarPedido() {
    const [show, setShow] = useState(false);

    const {
        getLoggedUser
    } = useLoggedUser();

    const [pedido, setPedido] = useState({
        fecha: "",
        precio_total: 0,
        cliente_id: getLoggedUser().id,
        quesos: {},
        id_pago: undefined
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

        <Modal className='modal-pedido' show={show} onHide={handleClose} backdrop="static" >
            <Modal.Header>
                <Modal.Title><h1>Confirmar compra</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {seccion === 1 && (
                    <ConfirmOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} showHook={{ show, setShow }}
                    />
                )}
                {seccion === 2 && (
                    <PayOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} showHook={{ show, setShow }}
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