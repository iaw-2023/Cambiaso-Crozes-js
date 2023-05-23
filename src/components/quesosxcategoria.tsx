import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Queso from "../models/queso";
import Loading from "../layouts/loading";

function QuesosxCategoria() {
    const { tipo_de_queso } = useParams(); //Recupero el tipo de queso de la url
    const location = useLocation();
    const { id } = location.state; //Recupero el id del tipo de queso de los parámetros
    
    const[quesosxcategoria,setQuesosxCategoria] = useState([])
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_MY_ENV + 'categorias';

        const showDataQuesosxCategoria = async(id: any) => {
            const response = await fetch(url+'/'+id+'/quesos');
            const dataQuesosxCategoria = await response.json();
            setQuesosxCategoria(dataQuesosxCategoria);
            setLoaded(true);
        }

        showDataQuesosxCategoria(id);
    }, [id]);
    
    return (
        <Container className="quesos-container">
            <h1 className="titulo">{tipo_de_queso}</h1>
            <h3 className="subtitulo">Quesos para todos los gustos</h3>
            
        	{ !isLoaded ? (
                <Loading></Loading>
            ): (
                <Container className="cards-container">
                    <Row xs={1} md={3} className="cards-container2">
                        {quesosxcategoria.map((queso: Queso, idx) => 
                            <Col className="card-col" key={idx}>
                                <Card className="custom-card">
                                    <Card.Link as={Link} to={"/quesos/"+queso.nombre}>
                                        <Card.Img variant="top" src={"data:image/png;base64," + queso.foto} />
                                    </Card.Link>
                                    <Card.Body className="custom-card-body">
                                        <Card.Title>{queso.nombre}</Card.Title>
                                        <Card.Text className="card-text">${queso.precio_x_kg}/kg</Card.Text>
                                        <Card.Link as={Link} to={"/quesos/"+queso.nombre} state={{estado:{id: queso.id, foto:queso.foto, descripcion:queso.descripcion, precio_x_kg:queso.precio_x_kg}}}>
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
export default QuesosxCategoria;