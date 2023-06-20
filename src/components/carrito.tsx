import { Button, Container, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/carrito-contexto";
import CartItem from '../models/carritoItem';
import { BsFillTrashFill } from "react-icons/bs";
import ConfirmarPedido from './compra-modal/confirmation-modal';

function Carrito() {
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
                            <Stack key={idx} direction="horizontal" gap={2} className="d-flex align-items-center">
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

                                <div className="carrito-item-precio"> ${(item.queso.precio_x_kg * item.gramosQueso / 1000)}</div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Botón para eliminar un queso del carrito">
                                    <BsFillTrashFill/>
                                </Button>
                            </Stack>
                        ))}
                        <div className="ms-auto fw-bold fs-5">
                            
                            Total: ${getCartItems().reduce((total, cartItem) => {
                                return total + ((cartItem.queso.precio_x_kg) * (+cartItem.gramosQueso) / 1000)
                            }, 0)}
                            
                        </div>
                    </Stack>

                    <ConfirmarPedido/>
                    
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