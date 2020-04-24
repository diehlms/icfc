import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import StyledInput from "../../shared/StyledInput";
import { TrixEditor } from "react-trix";
import Grid from '@material-ui/core/Grid';
import './Style.css'

export class Create extends Component {
    state = {
        events: "",
        location: "",
        start_time: "",
        user_id: null,
        end_time: "",
        description: ""
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onTrixChange = e => {
        this.setState({description: e })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addEvent(this.state.events, this.state.location, this.state.start_time, this.state.end_time, this.state.user_id, this.state.description)
    }

    handleEditorReady(editor) {
        editor.insertString("description: ");
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <StyledInput
                            placeholder="title"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.events}
                            name="events"
                        />
                    </FormGroup>
                    <FormGroup>
                        <TrixEditor
                            style={{
                                height: 100,
                                borderRight: '1px solid lightgrey',
                                borderBottom: '1px solid lightgrey',
                            }} 
                            placeholder="description"
                            onChange={this.onTrixChange}
                            fileParamName="description"
                            value={this.state.description}
                            onEditorReady={this.handleEditorReady} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <StyledInput
                            placeholder="location" 
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.location}
                            name="location"
                        />
                    </FormGroup>
                    <FormGroup>
                        <React.Fragment>
                            <Grid container>
                                <StyledInput
                                    type="date" 
                                    onChange={this.onChange}
                                    value={this.state.start_time}
                                    name="start_time"
                                    startAdornment="from:"
                                    style={{
                                        marginRight: 6
                                    }}
                                />
                                <StyledInput
                                    type="date" 
                                    onChange={this.onChange}
                                    value={this.state.end_time}
                                    name="end_time"
                                    startAdornment="to:"
                                />
                                <Button variant="text" type="submit">
                                    add an event
                                </Button>
                            </Grid>
                        </React.Fragment>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (events, location, start_time, end_time, user_id, description) => dispatch(actions.createEvent(events, location, start_time, end_time, user_id, description))
    }
}

export default connect(null, mapDispatchToProps)(Create);