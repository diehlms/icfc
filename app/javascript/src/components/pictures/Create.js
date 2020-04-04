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
        user_id: "3",
        caption: "",
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
        this.props.addPicture(this.state.caption, this.state.image, this.state.user_id)
    }
    
    render() {
        return (
            <div className="modalMain">
                <h1>Add a Picture</h1>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        Caption
                        <Input 
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.caption}
                            name="caption"
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
        addPicture: (caption, image, user_id) => dispatch(actions.createPicture(caption, image, user_id))
    }
}

export default connect(null, mapDispatchToProps)(Create);