import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class NavigationBar extends Component {
    render() {
        const navBarBrandStyle = {
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        };

        return (
            <Navbar bg="red" className="hoverable">
                <Navbar.Brand href="/" style={navBarBrandStyle} className="center brand-logo">
                    <i className="material-icons">photo</i>
                    MERN
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default NavigationBar;