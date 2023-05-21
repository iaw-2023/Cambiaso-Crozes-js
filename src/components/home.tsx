import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import React,{useEffect, useState} from 'react';
import Queso from '../models/queso';

function Home() {

    const[quesos,setQuesos] = useState([])
   
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/quesos'
    
    const showData = async() => {
        const response = await fetch(url);
        const dataQuesos = await response.json();
        setQuesos(dataQuesos);
    }

    useEffect(() => {
        showData();
    }, []);

    return (
        <>           
            <Container className="carousel-container">
                <Carousel slide={false}>
                    {quesos.map((queso: Queso) => 
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 img-resize"
                                src={`${"data:image/png;base64," + queso.foto}`}
                                alt={queso.nombre} />
                            <Carousel.Caption>
                                <h3>{queso.nombre}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            </Container>

            <h2>¡Bienvenido Quesolover!</h2>
        </>
    );
}

export default Home;