import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Queso from "../models/queso";
import Loading from "../layouts/loading";
import CategoriesPagination from "../layouts/pagination-categories";
import DataPagination from "../models/dataPagination";

function QuesosxCategoria() {
    const { tipo_de_queso, number } = useParams(); //Recupero el tipo de queso de la url
    const location = useLocation();
    const { id } = location.state; //Recupero el id del tipo de queso de los parámetros

    const[quesosxcategoria,setQuesosxCategoria] = useState([])
    const [isLoaded, setLoaded] = useState(false);
    const[dataPagination,setDataPagination] = useState<DataPagination>({'current_page': 1, 'last_page': 1, 'path':"", 'url':""});

    const showDataQuesosxCategoria = useCallback(async () => {
        const url = number !== undefined ? process.env.REACT_APP_MY_ENV + 'categorias/' + id + '/quesos?page=' + number : process.env.REACT_APP_MY_ENV + 'categorias/' + id + '/quesos';
        setLoaded(false);
        const response = await fetch(url);
        const dataQuesosxCategoria = await response.json();
        setDataPagination(dataQuesosxCategoria);
        setQuesosxCategoria(dataQuesosxCategoria.data);
        setLoaded(true);
    }, [id, number]);
    
    useEffect(() => {
        showDataQuesosxCategoria();
    }, [showDataQuesosxCategoria]);

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
                                    <Card.Link as={Link} to={"/quesos/"+queso.nombre}  state={{estado:{id: queso.id, nombre: queso.nombre, foto:queso.foto, descripcion:queso.descripcion, precio_x_kg:queso.precio_x_kg}}}>
                                        <Card.Img variant="top" src={"data:image/png;base64," + queso.foto} alt={queso.nombre}/>
                                    </Card.Link>
                                    <Card.Body className="custom-card-body">
                                        <Card.Title>{queso.nombre}</Card.Title>
                                        <Card.Text className="card-text">${queso.precio_x_kg}/kg</Card.Text>
                                        <Card.Link as={Link} to={"/quesos/"+queso.nombre} state={{estado:{id: queso.id, nombre: queso.nombre, foto:queso.foto, descripcion:queso.descripcion, precio_x_kg:queso.precio_x_kg}}}>
                                            <b><Button variant="outline-warning">Comprar</Button></b>
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>

                    <CategoriesPagination last_page={dataPagination.last_page} current_page={dataPagination.current_page} path={dataPagination.path} url={'/quesos/categoria/' + tipo_de_queso} id_category={id}></CategoriesPagination>

                </Container>
                
            )}
        </Container>
    )
}
export default QuesosxCategoria;