import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Loading from "../../layouts/loading";
import { useShoppingCart } from "../../context/carrito-contexto";
import { Link } from "react-router-dom";
import CartItem from "../../models/carritoItem";
import { useAuth0 } from "@auth0/auth0-react";
import Cliente from "../../models/cliente";

type EndOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
};

function EndOrder ({ pedidoHook, seccionHook }: EndOrderProps) {

    const { getAccessTokenSilently } = useAuth0();
    const carrito = useShoppingCart();

    const {pedido, setPedido} = pedidoHook;
    const { seccion, setSeccion} = seccionHook;

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

    async function crearPedido(){
        console.log(pedido)
        const urlPedido = process.env.REACT_APP_MY_ENV + 'pedidos';
        const token = await getAccessTokenSilently();
        await fetch(urlPedido, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": "",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
            body: JSON.stringify(pedido)
        }).then((response) => {
            if (!response.ok) {
                if(response.status === 422)
                    throw new Error("No tenemos alguno de los quesos que solicitaste, debemos reiniciar tu carrito :(");   
                else
                    throw new Error("No se pudo realizar el pedido, inténtalo más tarde");   
            }
            else {
                setLoaded(true);
            }
        }).catch((error: Error) => {
            setLoaded(true);
            setErrorMessage(error.message);
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
                            <div className="div-primer-boton">
                                <Link to="/">
                                    <Button className="boton-int-modal" variant="outline-warning" onClick={() => {setSeccion(1); carrito.emptyCart();}}>
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            </div>
                        </Container>
                    ) : (
                        <Container>
                            <h3>{errorMessage}</h3>  
                            <div className="div-primer-boton">
                                <Link to="/">
                                    <Button className="boton-int-modal" variant="outline-warning" onClick={() => {setSeccion(1); carrito.emptyCart();}}>
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            </div>
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