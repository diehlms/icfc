import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

export class Index extends Component {
    componentDidMount() {
        this.props.onFetchUsers()
    }

    render() {
        let users = 'not loaded yet, ya binch'

        if (!this.props.loading && this.props.users[1] && this.props.users[1].users) {
            users = this.props.users[1].users.map(user => {
                return (
                    <div>
                        <h1>{user.username}</h1>
                        <p>{user.firstname}</p>
                    </div>
                )
            })
        }
        return (
            <div>
                <h1>Users</h1>
                <div>{users}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)