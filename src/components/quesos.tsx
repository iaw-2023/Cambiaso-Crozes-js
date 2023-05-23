import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Queso from '../models/queso';
import { Link } from "react-router-dom";
import Loading from "../layouts/loading";

const Quesos = () => {

    const[quesos,setQuesos] = useState([])
    const [isLoaded, setLoaded] = useState(false);
   
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/quesos'
    
    const showData = async() => {
        const response = await fetch(url);
        const dataQuesos = await response.json();
        setQuesos(dataQuesos);
        setLoaded(true);
    }

    useEffect(() => {
        showData();
    }, []);

    return (
        <Container className="quesos-container">
            <h1 className="titulo">Quesos</h1>
            <h3 className="subtitulo">Pienso en queso y soy feliz</h3>
            
            { !isLoaded ? (
                <Loading></Loading>
            ): (
                <Container className="cards-container">
                    <Row xs={1} md={3} className="cards-container2">
                        {quesos.map((queso: Queso, idx) => 
                            <Col className="card-col" key={idx}>
                            <Card className="custom-card">
                                <Card.Link as={Link} to={"/quesos/"+queso.id}>
                                    <Card.Img variant="top" src={"data:image/png;base64," + queso.foto} />
                                </Card.Link>
                                <Card.Body className="custom-card-body">
                                    <Card.Title>{queso.nombre}</Card.Title>
                                    <Card.Text className="card-text">${queso.precio_x_kg}/kg</Card.Text>
                                    <Card.Link as={Link} to={"/quesos/"+queso.nombre}>
                                        <b><Button variant="outline-warning">Comprar</Button></b>
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            )}
        </Container>
    )
}
export default Quesos;