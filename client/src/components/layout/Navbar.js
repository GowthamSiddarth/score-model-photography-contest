import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import { logoutUser } from "../../utils/redux/actions/authActions";

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

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <div>
                <p className="black-text my-auto" style={{ fontFamily: "monospace", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" }}>
                Signed In as: 
                <Button
                    variant="outline-secondary"
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick.bind(this)}
                    className="waves-effect waves-light hoverable black-text my-auto">
                    {this.props.userName}
                </Button>
                </p>
            </div>
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
                                <AuthUserNameElement userName={this.props.auth.user.name.split(" ")[0]} logoutUser={this.props.logoutUser} />
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
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    logoutUser: bindActionCreators(logoutUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar));