import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import UserTable from './UserTable';
import { Typography } from '@material-ui/core';

export class Index extends Component {

    componentDidMount() {
        this.props.onFetchUsers();
    }

    render() {
        const users = [];

        if (!this.props.loading && this.props.users && this.props.users[1] && this.props.users[1].users) {
            this.props.users[1].users.map((user) => {
                const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                const cleanedPhoneNumber = user.phone_number.replace(phoneRegex, "$1-$2-$3");
                users.push({
                    username: user.username,
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email,
                    phoneNumber: cleanedPhoneNumber
                })
            })
        }

        return (
            <div className="containerMain">
                <Typography 
                    variant="h3"
                    style={{ 
                        textAlign: "center"
                    }}>
                    Users
                </Typography>
                <br/><br/>
                {this.props.loading && users.length === 0 ? (
                    <h1>Loading</h1>
                ) : (
                    <UserTable
                        users={users}
                    />
                )}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);