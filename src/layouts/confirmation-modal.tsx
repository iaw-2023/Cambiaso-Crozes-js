import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateClient from './create-client';
import { useShoppingCart } from '../context/carrito-contexto';
import CartItem from '../models/carritoItem';
import SearchClient from './search-client';
import ConfirmOrder from './confirm-order';
import EndOrder from './end-order';

function ConfirmarPedido() {
    const carrito = useShoppingCart();

    const [show, setShow] = useState(false);

    const [pedido, setPedido] = useState({
        fecha: "",
        precio_total: 0,
        cliente_id: "",
        quesos: {}
    });

    const actualizarPedido = () => {
        setPedido({
            ...pedido,
            fecha: new Date().toLocaleDateString('sv'),
            precio_total: carrito.getCartItems().reduce((total, cartItem) => {
                return total + ((cartItem.queso.precio_x_kg) * (+cartItem.gramosQueso) / 1000)}, 0),
            quesos: carrito.getCartItems().map((carritoItem: CartItem) => {
                return { 
                    queso_id: carritoItem.id,
                    cantidad: carritoItem.gramosQueso,
                    subtotal: (carritoItem.queso.precio_x_kg * carritoItem.gramosQueso / 1000)
                };
            })
        })
    }

    useEffect(() => {
        actualizarPedido();
    }, [carrito]);

    const [cliente, setCliente] = useState({
        id: "",
        nombre: "",
        apellido: "",
        ciudad: "",
        domicilio: "",
        email: ""
    });

    const [clienteOriginal, setClienteOriginal] = useState({
        id: "",
        nombre: "",
        apellido: "",
        ciudad: "",
        domicilio: "",
        email: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [seccion, setSeccion] = useState(1);

    return (
        <>
        <Button className="boton-modal" variant="outline-warning" onClick={handleShow}>
            Finalizar Compra
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title><h1>Confirmar compra</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {seccion === 1 && (
                    <SearchClient 
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} clienteOriginalHook={{ clienteOriginal, setClienteOriginal }}
                    />
                    
                )}
                {seccion === 2 && (
                    <CreateClient
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} clienteOriginalHook={{ clienteOriginal, setClienteOriginal }}
                    />
                )}
                {seccion === 3 && (
                    <ConfirmOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} clienteOriginalHook={{ clienteOriginal, setClienteOriginal }}
                    />
                )}
                {seccion === 4 && (
                    <EndOrder
                        pedidoHook={{ pedido, setPedido }} seccionHook={{ seccion, setSeccion }} clienteHook={{ cliente, setCliente }} clienteOriginalHook={{ clienteOriginal, setClienteOriginal }}
                    />
                )}
            </Modal.Body>
        </Modal>
        </>
    );
}
export default ConfirmarPedido;