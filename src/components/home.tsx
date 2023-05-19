import Carousel from 'react-bootstrap/Carousel';
import React,{useEffect, useState} from 'react';

type Queso = {
    id:bigint;
    nombre:string;
    precio_x_kg:number;
    foto:BinaryData;
    descripcion:string;
}

function Home() {

    const[quesos,setQuesos] = useState([])
   
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/quesos'
    
    const showData = async() => {
        const response = await fetch(url);
        const dataQuesos = await response.json();
        console.log(dataQuesos);
        setQuesos(dataQuesos);
    }

    useEffect(() => {
        showData();
    }, []);

    return (
        <Carousel className="align-items-center">
            {quesos.map((queso:Queso) => 
                <Carousel.Item interval={1000}>
                <img
                    className="w-50"
                    src={`${"data:image/png;base64," + queso.foto}`}
                    alt={queso.nombre}
                />
                <Carousel.Caption>
                  <h3>{queso.nombre}</h3>
                  <p>{queso.descripcion}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
        </Carousel>
    );
}

export default Home;