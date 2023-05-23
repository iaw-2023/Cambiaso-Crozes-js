
import { Button, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

function Queso() {
    const { nombre } = useParams(); 
    const location = useLocation();
    const { estado } = location.state; 

    return (
        <Container>
            <Row xs={1} md={2}>
                <Container >
                    <img className="d-block" src={"data:image/png;base64," + estado.foto} alt=""/>
                </Container>
                <Container className="datos-queso">
                    <h2 className="titulo2">{nombre}</h2>
                    <hr className="separador"/>
                    <p className="descripcion-queso">{estado.descripcion}</p>
                    <h3 className="titulo3">Precio por kilo: ${estado.precio_x_kg}</h3>
                
                    <Container className="comprar-queso">
                        
                        <Button variant="outline-warning">Agregar al Carrito</Button>
                    </Container>
                </Container>
            </Row>
        </Container>
    )
}
export default Queso; 