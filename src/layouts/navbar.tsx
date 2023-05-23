
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Categoria from '../models/categoria';
import { BsCart4,BsSearchHeart } from "react-icons/bs";
import { Button } from 'react-bootstrap';

function NavbarEx() {

    const[categorias,setCategoria] = useState([])
   
    const url = 'https://cambiaso-crozes-laravel-955ex9rx5-cambiaso-crozes.vercel.app/rest/categorias'
    
    const showData = async() => {
        const response = await fetch(url);
        const dataCategorias = await response.json();
        setCategoria(dataCategorias);
        setTextoABuscar('all');
    }

    useEffect(() => {
        showData();
    }, []);

    const [textoABuscar, setTextoABuscar] = useState('');
    const handleChange = (e: any) => {
        if(e.target.value == null || e.target.value.trim() === '')
            setTextoABuscar('all');
        else
            setTextoABuscar(e.target.value);
    };

    return (
        <>
            <Navbar className="navBg" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img 
                            src="https://i.ibb.co/4m3QVsf/logo-cut.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <b><Nav.Link as={Link} to="/">Home</Nav.Link></b>
                            <b><Nav.Link as={Link} to="/quesos">Quesos</Nav.Link></b>
                            <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                                {categorias.map((categoria: Categoria, idx) => 
                                    <NavDropdown.Item key={idx} as={Link} to={{pathname: 'quesos/categoria/'+categoria.tipo_de_queso}} state={{id: categoria.id}}>{categoria.tipo_de_queso}</NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/carrito"><BsCart4/></Nav.Link>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar Queso"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleChange}
                                />
                                <Link to={"/quesos/buscar/"+textoABuscar}>
                                    <Button variant="outline-dark"><BsSearchHeart/></Button>
                                </Link>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
            
        </>
    )
}
export default NavbarEx;