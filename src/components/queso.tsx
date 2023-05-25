
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function Queso() {
    const { nombre } = useParams(); 
    const location = useLocation();
    const { estado } = location.state; 

    let [cantidadQueso, setCantidadQueso] = useState(250);
    const handleChange = (e: any) => {
        setCantidadQueso(e.target.value);
    };

    return (
        <Container className="quesos-container">
            <Row xs={1} md={2}>
                <Container >
                    <img className="foto-queso" src={"data:image/png;base64," + estado.foto} alt=""/>
                </Container>
                <Container className="datos-queso">
                    <h2 className="titulo2">{nombre}</h2>
                    <hr className="separador"/>
                    <p className="descripcion-queso">{estado.descripcion}</p>
                    <h3 className="titulo3">Precio por kilo: ${estado.precio_x_kg}</h3>
                    <hr className="separador"/>
                    <Container className="comprar-queso">
                        <Row>
                            <Col sm={8}>
                                <FloatingLabel
                                className=""
                                controlId="floatingSelectGrid"
                                label="Seleccione la cantidad de queso deseada"
                                >
                                    <Form.Select className="seleccionar-queso" aria-label="Seleccion de queso" onChange={handleChange}>
                                        <option value="250">250g - ${estado.precio_x_kg * 0.25}</option>
                                        <option value="500">500g - ${estado.precio_x_kg * 0.5}</option>
                                        <option value="750">750g - ${estado.precio_x_kg * 0.75}</option>
                                        <option value="1000">1000g - ${estado.precio_x_kg}</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col sm={4}>
                                <Button variant="outline-warning" className="boton-comprar">Agregar al Carrito</Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Row>
        </Container>
    )
}
export default Queso; 

function handleChange(e: any) {
    throw new Error("Function not implemented.");
}
