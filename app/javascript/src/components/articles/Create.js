import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import SubTitle from '../../shared/SubTitle';
import HorizontalLine from '../../shared/HorizontalLine';
import * as actions from '../../store/actions/index';
import StyledInput from "../../shared/StyledInput";
import { TrixEditor } from "react-trix";
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

    handleEditorReady(editor) {
        editor.insertString("description: ");
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addArticle(this.state.title, this.state.content, this.state.user_id, this.state.image);
        this.setState({
            title: "",
            content: "",
            image: null
        })
    }
    
    render() {
        return (
            <div className="modalMain">
                <SubTitle text="Add an Article" />
                <HorizontalLine />
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <StyledInput 
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.title}
                            name="title"
                            placeholder="title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <TrixEditor
                            placeholder="content"
                            onChange={this.onTrixChange}
                            fileParamName="description"
                            value={this.state.description}
                            onEditorReady={this.handleEditorReady} 
                        />
                    </FormGroup>
                    <FormGroup>
                        Image:
                        <StyledInput
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