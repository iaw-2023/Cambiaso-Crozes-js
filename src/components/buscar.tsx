import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Queso from "../models/queso";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Buscar() {
    const { queso_a_buscar } = useParams();

    const[quesos,setQuesos] = useState([])
   
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/quesos'
    
    const showData = async(queso_a_buscar: any) => {
        const response = await fetch(url);
        const dataQuesos = await response.json();
        const buscar = queso_a_buscar ? queso_a_buscar : 'all';
        setQuesos(buscar == 'all' ? dataQuesos : dataQuesos.filter((queso:Queso) => queso.nombre.toLowerCase().includes(buscar.toLowerCase()))); 
        
    }

    useEffect(() => {
        showData(queso_a_buscar);
    }, [queso_a_buscar]);

    return (
        <Container className="quesos-container">
            <h1 className="titulo">Buscar {queso_a_buscar != 'all' ? queso_a_buscar : ''}</h1>
            <h3 className="subtitulo">Encuentra tu queso</h3>
            
            {quesos.length > 0 ? (
                <Container className="cards-container">
                    <Row xs={1} md={3} className="cards-container2">
                    
                        {quesos.map((queso: Queso, idx) => 
                            <Col className="card-col" key={idx}>
                                <Card className="custom-card">
                                    <Card.Link as={Link} to={"/quesos/"+queso.nombre}>
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
            ) : 
            (
                <h2 className="no-encontrado">No encontramos ese queso</h2>
            )
            }
        </Container>
    )
}
export default Buscar;