import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class Create extends Component {
    state = {
        name: "",
        bedrooms: "",
        user_id: "3",
        washerdryer: false,
        dock: false,
        description: "",
        price_per_day: 0,
        price_per_week: 0
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addCabin(this.state.name, this.state.bedrooms, this.state.description, this.state.user_id, this.state.washerdryer, this.state.dock, this.state.price_per_day, this.state.price_per_week)
    }

    render() {
        return (
            <div>
                <h1>Add a Cabin</h1>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        Name:
                        <Input
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.name}
                            name="name"
                        />
                    </FormGroup>
                    <FormGroup>
                        Description:
                        <Input 
                            type="textbox" 
                            onChange={this.onChange}
                            value={this.state.description}
                            name="description"
                        />
                    </FormGroup>
                    <FormGroup>
                        Dock:
                        <Checkbox
                            value={this.state.dock}
                        />
                        Washer Dryer:
                        <Checkbox
                            value={this.state.washerdryer}
                        />
                        Bedrooms:
                        <Input
                            type="text"
                            onChange={this.onChange}
                            value={this.state.bedrooms}
                            name="bedrooms"
                        />
                    </FormGroup>
                    <FormGroup>
                        Price Per Day:
                        <Input
                            type="number"
                            onChange={this.onChange}
                            value={this.state.price_per_day}
                            name="price_per_day"
                        />
                        Price Per Week:
                        <Input
                            type="number"
                            onChange={this.onChange}
                            value={this.state.price_per_week}
                            name="price_per_week"
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
        addCabin: (name, bedrooms, description, user_id, washerdryer, dock, price_per_day, price_per_week) => dispatch(actions.createCabin(name, bedrooms, description, user_id, washerdryer, dock, price_per_day, price_per_week))
    }
}

export default connect(null, mapDispatchToProps)(Create);
