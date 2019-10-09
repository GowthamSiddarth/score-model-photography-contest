import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="navbar-wrapper">
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            className="col s5 brand-logo center black-text">
                            <i className="material-icons">photo</i>
                            MERN
                        </Link>
                    </div>
                </nav>
            </div >
        );
    }
}

export default Navbar;