import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Queso from "../models/queso";
import Loading from "../layouts/loading";
import CategoriesPagination from "../layouts/pagination/pagination-categories";
import DataPagination from "../models/dataPagination";
import QuesoCard from "./cards/queso-card";

function QuesosxCategoria() {
    const { tipo_de_queso, number } = useParams(); //Recupero el tipo de queso de la url
    const location = useLocation();
    const { id } = location.state; //Recupero el id del tipo de queso de los parámetros

    const[quesosxcategoria,setQuesosxCategoria] = useState([])
    const [isLoaded, setLoaded] = useState(false);
    const[dataPagination,setDataPagination] = useState<DataPagination>({'current_page': 1, 'last_page': 1, 'path':"", 'url':""});

    useEffect(() => {
        const url = number !== undefined ? process.env.REACT_APP_MY_ENV + 'categorias/' + id + '/quesos?page=' + number : process.env.REACT_APP_MY_ENV + 'categorias/' + id + '/quesos';
        const showDataQuesosxCategoria = async(id: any, number: any) => {
            setLoaded(false);
            const response = await fetch(url);
            const dataQuesosxCategoria = await response.json();
            setDataPagination(dataQuesosxCategoria);
            setQuesosxCategoria(dataQuesosxCategoria.data);
            setLoaded(true);
        }
        showDataQuesosxCategoria(id, number);
    }, [id, number]);

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
                                <QuesoCard queso={queso}/>
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