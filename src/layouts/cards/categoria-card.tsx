import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type CategoriaCardProps = {
    quesoxcategoria: [id: number, tipo_de_queso: string, foto: BinaryData];
};

function CategoriaCard({quesoxcategoria}: CategoriaCardProps) {

    return(
        <Card className="custom-card">
            <Card.Img variant="top" src={"data:image/png;base64," + quesoxcategoria[2]} alt={quesoxcategoria[1]}/>
            <Card.Body className="custom-card-body">
                <Card.Title>{quesoxcategoria[1]}</Card.Title>
                <Card.Link as={Link} to={"/quesos/categoria/"+quesoxcategoria[1]} state={{id: quesoxcategoria[0]}}>
                    <b><Button variant="outline-warning">Ver más</Button></b>
                </Card.Link>
            </Card.Body>
        </Card>
    )

}
export default CategoriaCard;