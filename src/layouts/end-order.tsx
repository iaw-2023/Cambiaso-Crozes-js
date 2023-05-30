import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Loading from "./loading";
import { useShoppingCart } from "../context/carrito-contexto";
import { Link } from "react-router-dom";
import CartItem from "../models/carritoItem";

type EndOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
    clienteOriginalHook: { clienteOriginal: any; setClienteOriginal: (clienteOriginal: any) => void};
};

function EndOrder ({ pedidoHook, seccionHook, clienteHook, clienteOriginalHook }: EndOrderProps) {

    const carrito = useShoppingCart();

    const {pedido, setPedido} = pedidoHook;
    const {seccion, setSeccion} = seccionHook;
    const {cliente, setCliente} = clienteHook;
    const {clienteOriginal, setClienteOriginal} = clienteOriginalHook;

    const [isLoaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [modificado, setModificado] = useState(false);

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

    function crearPedido() {
        console.log('3 ' +pedido.cliente_id);
        const urlPedido = process.env.REACT_APP_MY_ENV + 'pedidos';
        fetch(urlPedido, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": "",
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(pedido)
        }).then((response) => {
            if (!response.ok)
                throw new Error("Ocurrió un error al realizar el pedido");
            else {
                setCliente({ id: "", nombre: "", apellido: "", ciudad: "", domicilio: "", email: "" });
                setClienteOriginal({ id: "", nombre: "", apellido: "", ciudad: "", domicilio: "", email: "" });
                carrito.emptyCart();
                setLoaded(true);
            }
        }).catch((error: Error) => {
            setLoaded(true);
            setErrorMessage("No se pudo realizar el pedido, inténtalo más tarde");
        });
    }

    useEffect(() => {
        if(pedido.cliente_id !== "" && modificado)
            crearPedido();
    }, [pedido.cliente_id]);
 
    useEffect(() => {
        setLoaded(false);
        if(cliente.id === "") {
            const url = process.env.REACT_APP_MY_ENV + 'clientes';
            const clienteCreado = {nombre: cliente.nombre, apellido: cliente.apellido, ciudad: cliente.ciudad, domicilio: cliente.domicilio, email: cliente.email}
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": "",
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(clienteCreado)
            }).then((response) => {
                if (!response.ok) 
                    throw new Error("Ocurrió un error al guardar el cliente");
                else {
                    return response.json();
                }    
            }).then((data) => {
                setCliente({...cliente, id: data.data});
                setPedido({...pedido, cliente_id: data.data});
                setModificado(true);
            }).catch((error: Error) => {
                setLoaded(true);
                setErrorMessage("No se pudo guardar el cliente, inténtalo más tarde");
            });        
        } else {
            const url = process.env.REACT_APP_MY_ENV + 'clientes/' + cliente.id;
            const clienteModificado = {nombre: cliente.nombre, apellido: cliente.apellido, ciudad: cliente.ciudad, domicilio: cliente.domicilio, email: cliente.email}
            fetch(url, {
                method: "PUT",
                headers: {
                    "X-CSRF-TOKEN": "",
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(clienteModificado)
            }).then((response) => {
                if (!response.ok) 
                    throw new Error("Ocurrió un error al guardar el cliente"); 
            }).then(() => {
                crearPedido();
            }).catch((error:Error) => {
                setLoaded(true);
                setErrorMessage("No se pudo guardar el cliente, inténtalo más tarde");
            });  
        }
    }, []);

    return (
        <Container>
            { isLoaded ? (
                <Container>
                    { errorMessage==="" ? (
                        <Container>
                            <h3>Su compra se ha realizado con éxito!</h3>
                        </Container>
                    ) : (
                        <Container>
                            <>{pedido.cliente_id}</>
                            <h3>{errorMessage}</h3>   
                        </Container>
                    )}
                </Container>
            ) : (
                <Loading></Loading>
            )}
        </Container>
    )
}
export default EndOrder;