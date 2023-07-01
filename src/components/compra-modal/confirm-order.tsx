import { Button, Container, Stack } from "react-bootstrap";
import CartItem from "../../models/carritoItem";
import { useShoppingCart } from "../../context/carrito-contexto";
import { useEffect } from "react";
import Cliente from "../../models/cliente";
import { useLoggedUser } from "../../context/usuario-contexto";

type ConfirmOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    showHook: { show: boolean; setShow: (show: boolean) => void};
};

function ConfirmOrder ({ pedidoHook, seccionHook, showHook }: ConfirmOrderProps) {

    const {setSeccion} = seccionHook;
    const {show, setShow} = showHook;

    const {
        getLoggedUser
    } = useLoggedUser();

    const carrito = useShoppingCart();

    const handleSubmitPedido = () => {
        setSeccion(2);
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
            <Container className="border-dashed border-2 border-gray-200 rounded container-info-pedido">
            <h3 className="mt-1">Datos del cliente</h3>
            <Stack gap={2}>    
                <div>
                    <div>
                        <p className="text-lg mb-0">
                            Nombre:{" "}
                            <span className="datos-confirmar-pedido">
                                {getLoggedUser().nombre}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-0">
                            Apellido:{" "}
                            <span className="datos-confirmar-pedido">
                                {getLoggedUser().apellido}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-0">
                            Ciudad:{" "}
                            <span className="datos-confirmar-pedido">
                                {getLoggedUser().ciudad}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-0">
                            Domicilio:{" "}
                            <span className="datos-confirmar-pedido">
                                {getLoggedUser().domicilio}
                            </span>
                        </p>
                    </div>
                </div>
            </Stack>
            </Container>

            <Container className="border-dashed border-2 border-gray-200 rounded container-info-pedido">
            <h3 className="mt-1">Datos del pedido</h3>
            <Stack gap={2}>
                {carrito.getCartItems().map((item: CartItem, idx:any) => (
                    <div key={idx}>
                    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                        <div className="me-auto">
                            <div>
                                <p className="text-lg mb-0">
                                    {item.queso.nombre}{" "}
                                    <span className="pedido-cant-queso text-base">
                                        x{item.gramosQueso}g
                                    </span>
                                </p>
                            </div>
                            <div className="pedido-precio-queso">
                                <p className="text-base mb-0">
                                    ${item.queso.precio_x_kg}
                                </p>
                            </div>
                        </div>
                        <div><p  className="text-lg mb-0"> ${(item.queso.precio_x_kg * item.gramosQueso / 1000)} </p></div>
                    </Stack>
                    <hr className="separador2"/>
                    </div>
                ))}
                <div className="ms-auto fw-bold fs-5">
                <p className="text-lg mb-0">Total: ${carrito.getCartItems().reduce((total, cartItem) => {
                                return total + ((cartItem.queso.precio_x_kg) * (+cartItem.gramosQueso) / 1000)
                            }, 0)}</p>
                </div>
            </Stack>
            </Container>
            <div className="div-botones-modal">
                <Button className="boton-int-modal" variant="outline-danger" onClick={() => setShow(false)}>
                    Cerrar
                </Button>
                <Button className="boton-int-modal" variant="outline-warning" type="submit" onClick={handleSubmitPedido}>
                    Ir a pagar
                </Button>
            </div>
           
        </Container>
    )
}
export default ConfirmOrder;