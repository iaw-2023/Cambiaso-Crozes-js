import { Button, Container, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/carrito-contexto";
import CartItem from '../models/carritoItem';
import { BsFillTrashFill } from "react-icons/bs";
import ConfirmarPedido from './compra-modal/confirmation-modal';
import { useAuth0 } from "@auth0/auth0-react";
import { useLoggedUser } from "../context/usuario-contexto";

function Carrito() {

    const {isAuthenticated} = useAuth0();
    
    const {
        isLoggedUser
    } = useLoggedUser();

    const {
        getCartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity
    } = useShoppingCart();

    return (
        <Container className="quesos-container">
            <h1 className="titulo">Carrito de Compras</h1>
            <h3 className="subtitulo">Compre sus quesos</h3>
            {cartQuantity > 0 ? (
                <Container>
                    <Stack gap={2}>
                        {getCartItems().map((item: CartItem, idx) => (
                            <div key={idx} >
                            <Stack direction="horizontal" gap={3} className="d-flex align-items-center flex-wrap">
                                <img
                                    src={"data:image/png;base64," + item.queso.foto} 
                                    className="carrito-imagen-queso"
                                    alt={item.queso.nombre + " en el carrito"}
                                    />
                                <div className="carrito-item-detalles">
                                    <div>
                                        {item.queso.nombre}{" "}
                                    </div>
                                    <div className="carrito-precio-queso">
                                        ${item.queso.precio_x_kg}/kg
                                    </div>
                                </div>
                                
                                <div className="carrito-item-acciones me-auto">
                                    <Button variant="outline-warning" onClick={() => decreaseCartQuantity(item.id, 250)}>
                                        -250g
                                    </Button>
                                    <div className="carrito-item-cantidad">
                                        <span>x{item.gramosQueso}g</span>
                                    </div>
                                    <Button variant="outline-warning" onClick={() => increaseCartQuantity(item.id, 250, item.queso)}>
                                        +250g
                                    </Button>
                                </div>

                                <div className="carrito-item-precio ms-auto"> ${(item.queso.precio_x_kg * item.gramosQueso / 1000)}</div>
                                <Button
                                    data-toggle="tooltip" data-placement="bottom" title="Eliminar"
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Botón para eliminar un queso del carrito">
                                    <BsFillTrashFill/>
                                </Button>
                            </Stack>
                            
                            <hr className="separador mt-4"/>
                            </div>
                        ))}
                        <div className="ms-auto fw-bold fs-5">
                            
                            Total: ${getCartItems().reduce((total, cartItem) => {
                                return total + ((cartItem.queso.precio_x_kg) * (+cartItem.gramosQueso) / 1000)
                            }, 0)}
                            
                        </div>
                    </Stack>

                    {isAuthenticated && isLoggedUser() ? 
                        <ConfirmarPedido />
                    :
                    (
                        <p className="text-base">Debe registrarse y completar sus datos para poder comprar sus quesos!</p>
                    )
                    }
                    
                </Container>
            ) : (
                <Container>
                    <p className="titulo4"> No hay quesos en el carrito </p>
                </Container>
            )}
        </Container>
    )
}
export default Carrito;