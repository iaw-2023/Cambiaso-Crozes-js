
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams, Navigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useShoppingCart } from "../context/carrito-contexto";
import Queso from '../models/queso';

function QuesoIndividual() {
    const { nombre } = useParams(); 
    const location = useLocation();
    const { estado } = location.state ? location.state: ""; 
    const [showAlert, setShowAlert] = useState(false);

    const {
        increaseCartQuantity
    } = useShoppingCart()

    let [cantidadQueso, setCantidadQueso] = useState(250);
    const handleChange = (e: any) => {
        let cantQueso: number = e.target.value;
        setCantidadQueso(cantQueso);
    };

    const quesoActual: Queso ={
        id: estado ? estado.id : 0,
        nombre: estado ? estado.nombre: "",
        precio_x_kg: estado ? estado.precio_x_kg: "",
        foto: estado ? estado.foto: "",
        descripcion: estado ? estado.descripcion: ""
    }

    const handleButtonClick = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); 
        
        increaseCartQuantity(estado.id, cantidadQueso, quesoActual);
    };
    
    return (
        <Container className="quesos-container">
            {estado ? (
                <Row xs={1} md={2}>
                    <Container>
                        <img className="foto-queso" src={"data:image/png;base64," + estado.foto} alt={nombre}/>
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
                                    <Button variant="outline-warning" className="boton-comprar" onClick={handleButtonClick}>Agregar al Carrito</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    {showAlert && (
                                        <Alert className="floating-alert" variant="warning" onClose={() => {setShowAlert(false)}} dismissible>
                                            Agregaste {cantidadQueso} gramos de {nombre} a tu carrito!
                                        </Alert>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Row>
            ) : (
                <Navigate to="/"/>
            )}
        </Container>
    )
}
export default QuesoIndividual; 