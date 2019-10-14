import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../utils/redux/actions/authActions";

import { Container, Row, Col, Button } from "react-bootstrap";

class Dashboard extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { user } = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You're logged into
                                <span style={{ fontFamily: "monospace" }}> Photography Scoring Model Contest</span>
                            </p>
                        </h4>
                        <Button
                            variant="outline-secondary"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick.bind(this)}
                            className="waves-effect waves-light hoverable">
                            Sign Out
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    logoutUser: bindActionCreators(logoutUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));