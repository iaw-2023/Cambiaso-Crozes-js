import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Queso from "../../models/queso";

type QuesoCardProps = {
    queso: Queso;
};

function QuesoCard({queso}: QuesoCardProps) {

    return(
        <Card className="custom-card quesos-card">
            <Card.Link as={Link} to={"/quesos/"+queso.nombre} state={{estado:{id: queso.id, nombre: queso.nombre, foto:queso.foto, descripcion:queso.descripcion, precio_x_kg:queso.precio_x_kg}}}>
                <Card.Img variant="top" src={"data:image/png;base64," + queso.foto} alt={queso.nombre} />
            </Card.Link>
            <Card.Body className="custom-card-body">
                <Card.Title>{queso.nombre}</Card.Title>
                <Card.Text className="card-text">${queso.precio_x_kg}/kg</Card.Text>
                <Card.Link as={Link} to={"/quesos/"+queso.nombre} state={{estado:{id: queso.id, nombre: queso.nombre, foto:queso.foto, descripcion:queso.descripcion, precio_x_kg:queso.precio_x_kg}}}>
                    <b><Button variant="outline-warning">Comprar</Button></b>
                </Card.Link>
            </Card.Body>
        </Card>
    )
}
export default QuesoCard;