import { SignOut } from "phosphor-react";
import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../shared/contexts/appContext";
import "./Header.css";
export function Header() {
    const { auth, logout } = React.useContext(AppContext);
    const validateRoute  = (auth: boolean): any => {
        if(!auth)
            return (
            <Link className="navigation" to="/login" > 
                Login 
            </Link>)          

        if(auth)
           return (
               <Link className="navigation" to="/login" onClick={logout}>                 
                   <SignOut size={28} />
                </Link> )
    }

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Receitas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Button variant="secondary">
                        {validateRoute(auth)}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}