import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Queso from '../models/queso';
import { Link, useParams } from "react-router-dom";
import Loading from "../layouts/loading";
import CheesePagination from "../layouts/pagination/pagination";
import DataPagination from '../models/dataPagination';
import QuesoCard from "../layouts/cards/queso-card";

const Quesos = () => {
    const { number } = useParams(); //Recupero el tipo de queso de la url

    const[quesos,setQuesos] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const[dataPagination,setDataPagination] = useState<DataPagination>({'current_page': 1, 'last_page': 1, 'path':"", 'url':""});

    useEffect(() => {
        const url = number !== undefined ? process.env.REACT_APP_MY_ENV + 'quesos?page=' + number : process.env.REACT_APP_MY_ENV + 'quesos';
    
        const showData = async() => {
            setLoaded(false);
            const response = await fetch(url);
            const dataQuesos = await response.json();
            setQuesos(dataQuesos.data);
            setDataPagination(dataQuesos);
            setLoaded(true);
        }
        showData();
    }, [number]);

    return (
        <Container className="quesos-container">
            <h1 className="titulo">Quesos</h1>
            <h3 className="subtitulo">Pienso en queso y soy feliz</h3>
            
            { !isLoaded ? (
                <Loading></Loading>
            ): (
                <Container className="cards-container">
                    <Row xs={1} md={2} className="cards-container2">
                        {quesos.map((queso: Queso, idx) => 
                            <Col className="card-col" key={idx}>
                                <QuesoCard queso={queso} />
                            </Col>
                        )}
                    </Row>
                    
                    <CheesePagination last_page={dataPagination.last_page} current_page={dataPagination.current_page} path={dataPagination.path} url={'/quesos'} ></CheesePagination>
                </Container>
        
            )}


        </Container>
    )
}
export default Quesos;