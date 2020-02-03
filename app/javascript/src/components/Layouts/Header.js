import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Header() {
    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/articles">Forum</Nav.Link>
                    <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    <Nav.Link as={Link} to="/cabins">Cabins</Nav.Link>
                    <Nav.Link as={Link} to="/users">Directory</Nav.Link>
                    <Nav.Link as={Link} to="/pictures">Pictures</Nav.Link>
                    <Nav.Link href="https://www.pronto2.com/icfc/">In-Season Reservations</Nav.Link>
                    <Nav.Link href="https://www.pronto2.com/icfc/offseason.php">Out of Season Reservations</Nav.Link>
                </Nav>
                <NavDropdown title="External Links" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Separated link</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Camp Informaiton" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Separated link</NavDropdown.Item>
                </NavDropdown>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    )
}
