import React, { useContext } from 'react'
import { Container, Navbar, Nav, NavDropdown, Form, Button, FormControl, Offcanvas } from 'react-bootstrap'
import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate()

    const { user, setUser, setOpen } = useContext(UserContext)

    const handleLogout = () => {

        localStorage.removeItem("token");
        setUser(false)
        setOpen({ open: true, variant: "success", message: "logged out" })
        navigate("/")


    }
    return (
        <div style={{ width: "100%", position: "fixed", top: "0" }}>

            <header
                style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#512dab",
                }}
                className='bg-primary'
            >
                <>
                    {['sm'].map((expand) => (
                        <Navbar key={expand} expand={expand} className="mb-3 pb-0" style={{ maxWidth: "80rem", width: "80rem" }}>
                            <Container fluid>
                                <Navbar.Brand href="#" style={{ color: "white" }}>
                                    Acme Support
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-${expand}`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                            Offcanvas
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body className='bg-primary'>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            {
                                                !user ?

                                                    (
                                                        <>
                                                            <Nav.Link
                                                                href="#action2"
                                                                style={{ color: "white" }}
                                                            >
                                                                Login
                                                            </Nav.Link>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                                user.role == "admin" &&
                                                                <>
                                                                    <Nav.Link
                                                                        onClick={() => navigate("/users")}
                                                                        style={{ color: "white" }}
                                                                    >
                                                                        Users
                                                                    </Nav.Link>

                                                                    <Nav.Link
                                                                        onClick={() => navigate("/department")}
                                                                        style={{ color: "white" }}
                                                                    >
                                                                        Department
                                                                    </Nav.Link>
                                                                </>
                                                            }
                                                            <>
                                                                <Nav.Link
                                                                    onClick={() => navigate("/all_tickets")}
                                                                    style={{ color: "white" }}
                                                                >
                                                                    Tickets
                                                                </Nav.Link>

                                                                <Nav.Link
                                                                    style={{ color: "white" }}
                                                                    onClick={handleLogout}
                                                                >
                                                                    Logout
                                                                </Nav.Link>
                                                            </>
                                                        </>
                                                    )
                                            }
                                        </Nav>

                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    ))}
                </>
            </header>

        </div>
    )
}
