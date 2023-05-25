import { Container } from "react-bootstrap";

function Carrito() {
    return (
        <Container className="quesos-container">
            <h1 className="titulo">Carrito de Compras</h1>
            <h3 className="subtitulo">Compre sus quesos</h3>
            
            <Container>
                El carrito está vacío
            </Container>
        </Container>
    )
}
export default Carrito;