import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../../utils/redux/actions/authActions";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

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
            <div className="container">
                <div className="row" style={{ paddingTop: "20px" }}>
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12">
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account?<Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames('', { invalid: errors.name })}
                            />
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames('', { invalid: errors.email })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames('', { invalid: errors.password })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.confirm_password}
                                error={errors.confirm_password}
                                id="confirm_password"
                                type="password"
                                className={classnames('', { invalid: errors.confirm_password })}
                            />
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <span className="red-text">{errors.confirm_password}</span>
                        </div>
                        <div className="col s8 offset-s2" style={{ paddingLeft: "10px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable green accent-4"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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