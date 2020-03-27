import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import { Link} from 'react-router-dom'

class Index extends React.Component {
    componentDidMount() {
        this.props.onFetchUsers()
    }

    render() {
        let users = 'users not loaded yet'
        if (!this.props.loading && this.props.users && this.props.users[1] && this.props.users[1].users) {
            users = this.props.users[1].users.map((user, index) => {
                return (
                    <div key={index}>
                        <Link to={`/user/${user.id}`}>{user.username}</Link>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Users</h1>
                {users}
            </div>
        )
    }
}

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