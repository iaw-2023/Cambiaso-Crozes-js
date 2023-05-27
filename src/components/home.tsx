import Carousel from 'react-bootstrap/Carousel';
import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Categoria from '../models/categoria';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../layouts/loading';

function Home() {

    const[quesosxcategoria,setQuesosxCategoria] = useState([])
    const [isLoaded, setLoaded] = useState(false);

    const showData = async() => {
        const url = process.env.REACT_APP_MY_ENV + 'categorias?page=1&porPagina=5';

        const response = await fetch(url);
        const dataCategorias = await response.json();
        const aux: any = [];
        const requests = (dataCategorias.data).map(async (categoria: Categoria) =>
            {
                const url2 = process.env.REACT_APP_MY_ENV + 'categorias/'+categoria.id+'/quesos';
                const response2 = await fetch(url2);
                const dataQuesoxCategoria = await response2.json();
                const info = [categoria.id, categoria.tipo_de_queso, (dataQuesoxCategoria.data)[0].foto];
                aux.push(info);
            }
        );

        Promise.all(requests).then(() => {
            setQuesosxCategoria(aux);
            setLoaded(true);
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
                        alt="De nuestra fábrica a tu hogar"/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/bb.png"
                        alt="Quesos varios SayCheese"/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/cc.png"
                        alt="Queso azul muestra SayCheese"/>
                </Carousel.Item>
            </Carousel>
            <hr className="separador"/>

            <h1 className="titulo">Bienvenido Quesolover!</h1>

            { !isLoaded ? (
                <Loading></Loading>
            ): (
                <Container className="cards-container">
                    <Row xs={1} md={3} className="cards-container2">
                        {quesosxcategoria.map((quesoxcategoria: any, idx) => 
                            <Col className="card-col" key={idx}>
                            <Card className="custom-card">
                                <Card.Img variant="top" src={"data:image/png;base64," + quesoxcategoria[2]} alt={quesoxcategoria[1]}/>
                                <Card.Body className="custom-card-body">
                                    <Card.Title>{quesoxcategoria[1]}</Card.Title>
                                    <Card.Link as={Link} to={"/quesos/categoria/"+quesoxcategoria[1]} state={{id: quesoxcategoria[0]}}>
                                        <b><Button variant="outline-warning">Ver más</Button></b>
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Home;