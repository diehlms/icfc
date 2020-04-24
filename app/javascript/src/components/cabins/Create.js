import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Title from '../../shared/Title';
import SubTitle from '../../shared/SubTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HorizontalLine from '../../shared/HorizontalLine';
import StyledInput from "../../shared/StyledInput";
import { TrixEditor } from "react-trix";
import Grid from '@material-ui/core/Grid';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

export class Create extends Component {
    state = {
        name: "",
        bedrooms: "",
        user_id: null,
        washerdryer: false,
        dock: false,
        description: "",
        price_per_day: 0,
        price_per_week: 0
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
        this.props.addCabin(this.state.name, this.state.bedrooms, this.state.description, this.state.user_id, this.state.washerdryer, this.state.dock, this.state.price_per_day, this.state.price_per_week)
    }

    render() {
        return (
            <div className="modalName">
                <Title text="Add a Cabin" />
                <HorizontalLine />
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <StyledInput
                            placeholder="cabin name"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.name}
                            name="name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <TrixEditor
                            type="textbox" 
                            onChange={this.onChange}
                            value={this.state.description}
                            name="description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Grid container>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value={this.state.dock}
                                    color="primary"
                                />
                                }
                                label="Dock"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value={this.state.washerdryer}
                                    color="primary"
                                />
                                }
                                label="Washer/Dryer"
                            />
                            <StyledInput
                                startAdornment="bedrooms:"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.bedrooms}
                                name="bedrooms"
                            />
                            <StyledInput
                                startAdornment="price per day:"
                                type="number"
                                onChange={this.onChange}
                                value={this.state.price_per_day}
                                name="price_per_day"
                            />
                            <StyledInput
                                startAdornment="price per week:"
                                type="number"
                                onChange={this.onChange}
                                value={this.state.price_per_week}
                                name="price_per_week"
                            />
                        </Grid>
                    </FormGroup>
                    <Button variant="text" type="submit">
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
