import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Button from '@material-ui/core/Button';
import { TrixEditor } from "react-trix";

export class Create extends Component {
    state = {
        user_id: this.props.user_id,
        article_id: parseInt(this.props.article_id),
        content: ""
    }
    
    onChange = e => {
        this.setState({content: e })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onCreateComment(this.state.user_id, this.state.article_id, this.state.content);
        this.setState({
            content: ""
        })
    }

    handleEditorReady(editor) {
        editor.insertString("");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TrixEditor
                        onChange={this.onChange}
                        fileParamName="content"
                        value={this.state.content}
                        onEditorReady={this.handleEditorReady} 
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
