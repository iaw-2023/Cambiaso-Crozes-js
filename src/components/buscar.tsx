import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Queso from "../models/queso";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Loading from "../layouts/loading";
import DataPagination from "../models/dataPagination";
import CheesePagination from "../layouts/pagination/pagination";

function Buscar() {
    const { queso_a_buscar, number } = useParams();

    const[quesos,setQuesos] = useState([])
    const[isLoaded, setLoaded] = useState(false);    
    const[dataPagination,setDataPagination] = useState<DataPagination>({'current_page': 1, 'last_page': 1, 'path':"", 'url':""});

    useEffect(() => {
        const urlQuesos = number !== undefined ? process.env.REACT_APP_MY_ENV + 'quesos?page=' + number : process.env.REACT_APP_MY_ENV + 'quesos';
        
        const urlBuscar = number !== undefined ? process.env.REACT_APP_MY_ENV + 'quesos/buscar/' + queso_a_buscar + '?page=' + number : process.env.REACT_APP_MY_ENV + 'quesos/buscar/' + queso_a_buscar;

        const showData = async(queso_a_buscar: any) => {
            setLoaded(false);

            const buscar = queso_a_buscar ? queso_a_buscar : 'all';

            if(buscar !== 'all') {
                const response = await fetch(urlBuscar);
                const dataQuesos = await response.json();
                setQuesos(dataQuesos.data);
                setDataPagination(dataQuesos);
                setLoaded(true);
            } else {
                const response = await fetch(urlQuesos);
                const dataQuesos = await response.json();
                setQuesos(dataQuesos.data);
                setDataPagination(dataQuesos);
                setLoaded(true);
            }
                
        }
        showData(queso_a_buscar);
    }, [queso_a_buscar, number]);
    
    return (
        <Container className="quesos-container">
            <h1 className="titulo">Buscar {queso_a_buscar !== 'all' ? queso_a_buscar : ''}</h1>
            <h3 className="subtitulo">Encuentra tu queso ideal</h3>
            
            { !isLoaded ? (
                <Loading></Loading>
            ): (
                <>
                    {quesos.length > 0 ? (
                        <Container className="cards-container">
                            <Row xs={1} md={3} className="cards-container2">
                            
                                {quesos.map((queso: Queso, idx) => 
                                    <Col className="card-col" key={idx}>
                                        <Card className="custom-card">
                                            <Card.Link as={Link} to={"/quesos/"+queso.nombre}>
                                                <Card.Img variant="top" src={"data:image/png;base64," + queso.foto} alt={queso.nombre} />
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
                            <CheesePagination last_page={dataPagination.last_page} current_page={dataPagination.current_page} path={dataPagination.path} url={'/quesos/buscar/' + queso_a_buscar} ></CheesePagination>
                        </Container>
                    ) : 
                    (
                        <h2 className="no-encontrado">No encontramos ese queso</h2>
                    )
                    } 
                </>
            )}
        </Container>
    )
}
export default Buscar;