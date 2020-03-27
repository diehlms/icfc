import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export class Create extends Component {
    state = {
        user_id: this.props.user_id,
        article_id: this.props.article_id,
        content: ""
    }
    
    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onCreateComment(this.state.user_id, this.state.article_id, this.state.content)
    }

    render() {
        return (
            <div>
                <h1>Post a comment</h1>
                <form onSubmit={this.onSubmit}>
                    <Input 
                        type="text" 
                        onChange={this.onChange}
                        value={this.state.content}
                        name="content"
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateComment: (user_id, article_id, content) => dispatch(actions.createComment(user_id, article_id, content))
    }
}

export default connect(null, mapDispatchToProps)(Create)
