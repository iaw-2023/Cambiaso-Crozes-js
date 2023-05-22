import Carousel from 'react-bootstrap/Carousel';
import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Categoria from '../models/categoria';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {

    const[quesosxcategoria,setQuesosxCategoria] = useState([])
    
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/categorias'

    const showData = async() => {
        const response = await fetch(url);
        const dataCategorias = await response.json();
        const aux: any = [];
        const requests = dataCategorias.map(async (categoria: Categoria) =>
            {
                const response2 = await fetch(url+'/'+categoria.id+'/quesos');
                const dataQuesoxCategoria = await response2.json();
                const info = [categoria.id, categoria.tipo_de_queso, dataQuesoxCategoria[0].foto];
                aux.push(info);
            }
        );

        Promise.all(requests).then(() => {
            setQuesosxCategoria(aux);
          });

    }

    useEffect(() => {
        showData();
    }, []);


    return (
        <>             
            <Carousel>         
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/aa.png"
                        alt=""/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/bb.png"
                        alt=""/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/cc.png"
                        alt=""/>
                </Carousel.Item>
            </Carousel>
            <hr className="separador"/>

            <h1 className="titulo">Bienvenido Quesolover!</h1>

            <Container className="cards-container">
                <Row xs={1} md={3} className="cards-container2">
                    {quesosxcategoria.map((quesoxcategoria: any, idx) => 
                        <Col className="card-col" key={idx}>
                        <Card className="custom-card">
                            <Card.Img variant="top" src={"data:image/png;base64," + quesoxcategoria[2]} />
                            <Card.Body className="custom-card-body">
                                <Card.Title>{quesoxcategoria[1]}</Card.Title>
                                <Card.Link as={Link} to={"/quesos/categoria/"+quesoxcategoria[0]}>
                                    <b><Button variant="outline-warning">Ver más</Button></b>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            
        </>
    );
}

export default Home;