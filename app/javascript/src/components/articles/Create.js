import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class Create extends Component {
    state = {
        title: "",
        content: "",
        user_id: this.props.user_id,
        image: null,
        uploading: false,
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }
    
    imageUpload = e => {
        this.setState({image: e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addArticle(this.state.title, this.state.content, this.state.user_id, this.state.image)
    }
    
    render() {
        return (
            <div>
                <h1>Add an Article</h1>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        Title:
                        <Input 
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.title}
                            name="title"
                        />
                    </FormGroup>
                    <FormGroup>
                        Content:
                        <Input 
                            type="textbox" 
                            onChange={this.onChange}
                            value={this.state.content}
                            name="content"
                        />
                    </FormGroup>
                    <FormGroup>
                        Image:
                        <Input
                            type="file"
                            onChange={this.imageUpload}
                        />
                    </FormGroup>
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
        addArticle: (title, content, user_id, image) => dispatch(actions.createArticle(title, content, user_id, image))
    }
}

export default connect(null, mapDispatchToProps)(Create);