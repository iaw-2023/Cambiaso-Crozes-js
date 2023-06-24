
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Categoria from '../models/categoria';
import { BsCart4,BsSearchHeart } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/carrito-contexto';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './loading';
import { useLoggedUser } from '../context/usuario-contexto';

function NavbarEx() {

    const {
        setIsLoggedIn,
        setUserAsLogged,
        deleteLoggedUser,
    } = useLoggedUser();

    const navigate = useNavigate();

    const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

    const [loading, isLoading] = useState(true);

    const [categorias, setCategoria] = useState([]);
    const { cartQuantity } = useShoppingCart();

    const getUserFromAPI = async () => {
        isLoading(true);
        const token = await getAccessTokenSilently();
        try {
            await fetch(process.env.REACT_APP_MY_ENV+"clienteLoggeado", {
                method: "GET",
                headers: {
                    "X-CSRF-TOKEN": "",
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
            }).then(response => {
                if(response.status === 200) {
                    return response.json();
                } else if(response.status === 202) {
                    navigate('/perfil/crear');
                    setIsLoggedIn(true);
                    isLoading(false);
                } else {
                    throw new Error("Ha ocurrido un error inesperado buscando el cliente logueado");
                }
            }).then(data => {
                setUserAsLogged(data);
                setIsLoggedIn(true);
                isLoading(false);
            }).catch(error => {
                isLoading(false);
            });
        } catch(error) {
            isLoading(false);
        }        
    }

    useEffect( () => {
        isLoading(false);
        if(isAuthenticated) {
            getUserFromAPI();
        } else {
            setIsLoggedIn(false);
            deleteLoggedUser();
        }
    }, [isAuthenticated]);
   
    useEffect(() => {
        const url = process.env.REACT_APP_MY_ENV + 'categorias';
    
        const showData = async() => {
            try {
                const response = await fetch(url);
                if(!response.ok)
                    throw new Error("Ocurrió un error");
                const dataCategorias = await response.json();
                setCategoria(dataCategorias.data);
                setTextoABuscar('all');
            } catch(error) {}
        }
        showData();
    }, []);

    const [textoABuscar, setTextoABuscar] = useState('');

    const handleChange = (e: any) => {
        var pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        if(e.target.value == null || e.target.value.trim() === '' || !pattern.test(e.target.value))
            setTextoABuscar('all');
        else 
            setTextoABuscar(e.target.value);
    };

    const handleKeyDown = (e:any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Navbar sticky='top' className="navBg" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img 
                            src="https://i.ibb.co/4m3QVsf/logo-cut.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Logo negro SayCheese"
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
                        <Nav className='carrito-nav'>
                            
                            {loading ? (
                                <Loading></Loading>
                            ): (
                                <>
                                {isAuthenticated ? (
                                    <>
                                    <b><Nav.Link as={Link} to="/perfil">Perfil</Nav.Link></b>
                                    <b><Nav.Link onClick={() => {
                                        logout({ logoutParams: { returnTo: window.location.origin } });
                                        deleteLoggedUser();
                                        setIsLoggedIn(false);
                                        isLoading(true);
                                    }}>Salir</Nav.Link></b>
                                    </>
                                ):(
                                    <>
                                    <b><Nav.Link onClick={ () => loginWithRedirect() }>Ingresar</Nav.Link></b>
                                    </>
                                )}
                                </>
                            )}

                            <Nav.Link className='carrito-logo' as={Link} to="/carrito">
                                <Button data-toggle="tooltip" data-placement="bottom" title="Carrito" variant="outline-dark buscar-boton">
                                    <BsCart4/>
                                    
                                    <div className='rounded-circle bg-black d-flex justify-content-center align-items-center carrito-logo-numero'>
                                        {cartQuantity}
                                    </div>
                                </Button>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar Queso"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <Link to={"/quesos/buscar/"+textoABuscar}>
                                    <Button data-toggle="tooltip" data-placement="bottom" title="Buscar" variant="outline-dark buscar-boton" aria-label="Botón para buscar un queso"><BsSearchHeart/></Button>
                                </Link>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className='section-fondo'>
                <Outlet></Outlet>
            </section>
            
        </>
    );
}
export default NavbarEx;