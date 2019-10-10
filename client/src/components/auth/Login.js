import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(user);
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
                        <div className="col s12" style={{ paddingLeft: "10px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account?<Link to="/register"> Register</Link>
                            </p>
                        </div>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s8 offset-s2">
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col s8 offset-s2">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;