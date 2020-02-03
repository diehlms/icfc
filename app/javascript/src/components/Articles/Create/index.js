import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export class CreateArticleModal extends Component {
    state = {
        title: "",
        content: "",
        img: "",
        user_id: this.props.user_id
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    addArticle = (event) => {
        event.preventDefault();
        const { title, content, img, user_id} = this.state;
    
        if (title.length == 0 || content.length == 0)
          return;
    
        this.props.onAddArticle({
            "title": title,
            "content": content,
            "img": img,
            "user_id": user_id
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addArticle}>
                    <FormControl
                        type="text"
                        name="title"
                        id="title"
                        value={this.state.title}
                        required
                        onChange={this.onChange}
                    />
                    <FormControl
                        type="text"
                        name="content"
                        id="content"
                        value={this.state.content}
                        required
                        onChange={this.onChange}
                    />
                    <Button type="submit">
                        Post Article
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddArticle: () => dispatch(actions.createArticle(title, content, img, user_id))
    }
}
export default connect(null, mapDispatchToProps)(CreateArticleModal)