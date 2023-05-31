import { Button, Container, Stack } from "react-bootstrap";
import CartItem from "../../models/carritoItem";
import { useShoppingCart } from "../../context/carrito-contexto";
import { useEffect } from "react";

type ConfirmOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    clienteHook: { cliente: any; setCliente: (cliente: any) => void};
};

function ConfirmOrder ({ pedidoHook, seccionHook, clienteHook }: ConfirmOrderProps) {

    const {setSeccion} = seccionHook;
    const {cliente} = clienteHook;

    const carrito = useShoppingCart();

    const handleSubmitPedido = () => {
        setSeccion(4);
    };

    useEffect(() => {
        const {pedido, setPedido} = pedidoHook;
        
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

    return (
        <Container>
            <Container className="border rounded border-black container-info-pedido">
            <h3>Datos del cliente</h3>
            <Stack gap={2}>    
                <div className="me-auto">
                    <div>
                        <p>
                        <span className="datos-confirmar-pedido">
                            Nombre:{" "}{cliente.nombre}
                        </span>
                        </p>
                    </div>
                    <div>
                        <p>
                        <span className="datos-confirmar-pedido">
                            Apellido:{" "}{cliente.apellido}
                        </span>
                        </p>
                    </div>
                    <div>
                        <p>
                        <span className="datos-confirmar-pedido">
                            Ciudad:{" "}{cliente.ciudad}
                        </span>
                        </p>
                    </div>
                    <div>
                        <p>
                        <span className="datos-confirmar-pedido">
                            Domicilio:{" "}{cliente.domicilio}
                        </span>
                        </p>
                    </div>
                </div>
            </Stack>
            </Container>

            <Container className="border rounded border-black container-info-pedido">
            <h3>Datos del pedido</h3>
            <Stack gap={2}>
                {carrito.getCartItems().map((item: CartItem, idx:any) => (
                    <div key={idx}>
                    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                        <div className="me-auto">
                            <div>
                                <p>
                                {item.queso.nombre}{" "}
                                <span className="text-muted carrito-cant-queso">
                                    x{item.gramosQueso}g
                                </span>
                                </p>
                            </div>
                            <div className="text-muted carrito-precio-queso">
                                <p>
                                ${item.queso.precio_x_kg}
                                </p>
                            </div>
                        </div>
                        <div><p> ${(item.queso.precio_x_kg * item.gramosQueso / 1000)} </p></div>
                    </Stack>
                    <hr className="separador2"/>
                    </div>
                ))}
                <div className="ms-auto fw-bold fs-5">
                <p>Total: ${carrito.getCartItems().reduce((total, cartItem) => {
                                return total + ((cartItem.queso.precio_x_kg) * (+cartItem.gramosQueso) / 1000)
                            }, 0)}</p>
                </div>
            </Stack>
            </Container>
            <div className="div-botones-modal">
                <Button className="boton-int-modal" variant="outline-dark" onClick={() => {setSeccion(2)}}>
                    Anterior
                </Button>
                <Button className="boton-int-modal" variant="outline-warning" type="submit" onClick={handleSubmitPedido}>
                    Confirmar Compra
                </Button>
            </div>
           
        </Container>
    )
}
export default ConfirmOrder;