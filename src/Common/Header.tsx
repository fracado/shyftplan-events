import React from "react";
import {Container, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>
                    <b>Shyftplan Events</b>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
};

export default Header;
