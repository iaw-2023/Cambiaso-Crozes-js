import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Loading from "../../layouts/loading";
import { useShoppingCart } from "../../context/carrito-contexto";
import { Link } from "react-router-dom";
import CartItem from "../../models/carritoItem";

type EndOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
};

function EndOrder ({ pedidoHook, seccionHook, clienteHook }: EndOrderProps) {

    const carrito = useShoppingCart();

    const {pedido, setPedido} = pedidoHook;
    const {cliente, setCliente} = clienteHook;

    const [isLoaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
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
    }, [carrito]);

    function crearPedido(){
        const urlPedido = process.env.REACT_APP_MY_ENV + 'pedidos/' + cliente.email;
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
                carrito.emptyCart();
                setLoaded(true);
            }
        }).catch((error: Error) => {
            setLoaded(true);
            setErrorMessage("No se pudo realizar el pedido, inténtalo más tarde");
        });
    }

    useEffect(() => {
            crearPedido();
    }, []);
 
    return (
        <Container>
            { isLoaded ? (
                <Container>
                    { errorMessage==="" ? (
                        <Container>
                            <h3>Su compra se ha realizado con éxito!</h3>
                            <Link to={""}>
                                <Button>
                                
                                </Button>
                            </Link>
                        </Container>
                    ) : (
                        <Container>
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