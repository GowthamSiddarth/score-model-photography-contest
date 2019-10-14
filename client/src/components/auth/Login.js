import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classnames from 'classnames';

import { loginUser } from "../../utils/redux/actions/authActions";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        delete this.state.errors[e.target.id];
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(user, this.props.history);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
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
                            <b>Login</b>
                        </h4>
                        <p className="grey-text text-darken-1 text-center">
                            Don't have an account?<Link to="/register" style={{ textDecoration: 'none' }}> Register</Link>
                        </p>
                    </Col>
                    <Col md={{ span: 5, offset: 2 }} style={{ paddingTop: "30px" }}>
                        <Form noValidate onSubmit={this.onSubmit}>
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
                            <div class="text-center">
                                <Button
                                    variant="outline-primary"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="waves-effect waves-light hoverable"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    loginUser: bindActionCreators(loginUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));