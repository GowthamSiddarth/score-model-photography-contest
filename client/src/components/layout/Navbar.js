import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const navIconTextItemStyle = {
    fontFamily: "monospace",
    display: "flex",
    alignItems: "center"
};

class RegisterNavLink extends Component {
    render() {
        return (
            <Nav.Link href="/register" style={navIconTextItemStyle} className="black-text"><i className="material-icons">how_to_reg</i>Register</Nav.Link>
        );
    }
}

class LoginNavLink extends Component {
    render() {
        return (
            <Nav.Link href="/login" style={navIconTextItemStyle} className="black-text"><i className="material-icons">navigate_next</i>Login</Nav.Link>
        );
    }
}

class AuthUserNameElement extends Component {
    render() {
        return (
            <p className="black-text my-auto" style={{ fontFamily: "monospace", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" }}>Signed In as: {this.props.userName}</p>
        );
    }
}

class NavigationBar extends Component {
    render() {
        return (
            <Navbar className="hoverable py-0" fixed="top" collapseOnSelect expand="lg" style={{ height: "auto" }}>
                <Navbar.Brand href="/" style={navIconTextItemStyle}>
                    <i className="material-icons">photo</i>
                    SCORE YOUR PICS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-non-brand-items" />
                <Navbar.Collapse id="navbar-non-brand-items">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">How to Use</Nav.Link>
                        <Nav.Link href="/">Contact Us</Nav.Link>
                    </Nav>
                    {
                        this.props.auth.isAuthenticated ?
                            <Nav>
                                <AuthUserNameElement userName={this.props.auth.user.name.split(" ")[0]} />
                            </Nav> :
                            <Nav>
                                <RegisterNavLink />
                                <LoginNavLink />
                            </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(NavigationBar));