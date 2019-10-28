import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../utils/redux/actions/authActions";
import { getContestsForUser } from "../../utils/redux/actions/dashboardActions";

import { Container, Row, Col, Table } from "react-bootstrap";

import Moment from "moment";

class Dashboard extends Component {

    componentDidMount() {
        const userData = {
            id: this.props.auth.user.id,
            isAdmin: this.props.auth.user.isAdmin
        };
        this.props.getContestsForUser(userData);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        {
                            !this.props.dashboard.contests ? <p>Loading...</p> :
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Contest Name</th>
                                            <th>Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.dashboard.contests.map((contest, idx) => <tr key={idx}><td className="text-center"><Link>{contest.name}</Link></td><td className="text-center">{Moment(contest.created_on).format('Do MMM YYYY')}</td></tr>)
                                        }
                                    </tbody>
                                </Table>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => ({
    logoutUser: bindActionCreators(logoutUser, dispatch),
    getContestsForUser: bindActionCreators(getContestsForUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));