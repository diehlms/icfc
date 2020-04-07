import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import './Style.css'

export class Create extends Component {
    state = {
        events: "",
        location: "",
        start_time: "3",
        user_id: 3,
        end_time: "",
        description: ""
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addEvent(this.state.events, this.state.location, this.state.start_time, this.state.end_time, this.state.user_id, this.state.description)
    }
    
    render() {
        return (
            <div>
                <h1>Add an Event</h1>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        Title:
                        <Input
                            className="inputField"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.events}
                            name="events"
                        />
                    </FormGroup>
                    <FormGroup>
                        Content:
                        <Input
                            className="inputField"
                            type="textbox" 
                            onChange={this.onChange}
                            value={this.state.description}
                            name="description"
                        />
                    </FormGroup>
                    <FormGroup>
                        Location
                        <Input
                            className="inputField" 
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.location}
                            name="location"
                        />
                    </FormGroup>
                    <FormGroup>
                        Start Date:
                        <Input
                            className="inputField"
                            type="date" 
                            onChange={this.onChange}
                            value={this.state.start_time}
                            name="start_time"
                        />
                        End Date:
                        <Input
                            className="inputField" 
                            type="date" 
                            onChange={this.onChange}
                            value={this.state.end_time}
                            name="end_time"
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
        addEvent: (events, location, start_time, end_time, user_id, description) => dispatch(actions.createEvent(events, location, start_time, end_time, user_id, description))
    }
}

export default connect(null, mapDispatchToProps)(Create);