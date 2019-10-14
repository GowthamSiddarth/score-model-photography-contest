import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../../utils/redux/actions/authActions";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        delete this.state.errors[e.target.id];
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        };

        this.props.registerUser(newUser, this.props.history);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <Container>
                <Row>
                    <Col className="my-auto" md={4} xs={0}>
                        <Link to="/" className="btn-flat waves-effect" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                                </Link>
                        <h4 className="text-center">
                            <b>Register</b>
                        </h4>
                        <p className="grey-text text-darken-1 text-center">
                            Already have an account?<Link to="/login" style={{ textDecoration: 'none' }}> Login</Link>
                        </p>
                    </Col>
                    <Col md={{ span: 5, offset: 2 }} style={{ paddingTop: "30px" }}>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    type="text"
                                    className={classnames('input-field', { invalid: errors.name })}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    type="email"
                                    className={classnames('', { invalid: errors.email })}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    type="password"
                                    className={classnames('', { invalid: errors.password })}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="confirm_password">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.confirm_password}
                                    error={errors.confirm_password}
                                    type="password"
                                    className={classnames('', { invalid: errors.confirm_password })}
                                    isInvalid={!!errors.confirm_password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                            </Form.Group>
                            <div class="text-center">
                                <Button
                                    variant="outline-success"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="waves-effect waves-light hoverable black-text accent-4"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    registerUser: bindActionCreators(registerUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));