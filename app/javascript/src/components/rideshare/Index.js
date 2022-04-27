import React, { Component } from 'react'
import Header from '../shared/PageTitle';
import BarLoader from 'react-spinners/BarLoader';
import { Table, Form, Input, Grid, Container, Checkbox } from 'semantic-ui-react';
import { Breadcrumb } from 'react-bootstrap';
import * as axios from 'axios';
import "./rideshare.css";

import ErrorToast from '../shared/ErrorToast';
import RideshareRow from './RideshareItem';
import LocationDropdown from './LocationDropdown';

export class Index extends Component {
    state = {
        isLoading: false,
        uploading: false,
        sessionId: null,
        rideshares: null,
        departureLocationId: null,
        arrivalLocationId: null,
        seeking: true
    }

    componentDidMount() {
        this.getRideshares();
    }

    handleChange = (e, value) => {
        this.setState({[value.content]: value.value });
    };

    getRideshares() {
        this.setState({
            isLoading: true,
            sessionId: this.props.userId
        });
        axios.get('/api/v1/rideshares')
        .then(res => {
            this.setState({
                rideshares: res.data,
                isLoading: false
            });
        })
        .catch(err => {
            this.setState({
                errorMessage: "We're having trouble finding rideshares for your request. Please try again later",
                isLoading: false
            });
        });
    }

    updateTypeValue = (e) => {
        e.preventDefault();
        this.setState({
            seeking: !this.state.seeking
        })
    }

    updateDate = (e, inputName) => {
        e.preventDefault();
        this.setState({
            [inputName]: e.target.value
        });
    }

    addRideshare = (e) => {
        e.preventDefault();
        this.setState({
            uploading: true
        });
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let body = {
            number_of_passengers: this.state.numberOfPassengers,
            additional_information: this.state.additionalInformation,
            point_of_arrival_id: this.state.departureLocationId, 
            point_of_departure_id: this.state.arrivalLocationId,
            user_id: this.props.userId,
            arriving_at: this.state.arrivingAt,
            departing_at: this.state.leavingAt,
            seeking: this.state.seeking
        }
        axios({
            method: 'post',
            url: `/api/v1/rideshares/create`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(body)
        }).then(() => {
            this.setState({errors: null});
            this.getRideshares();
        })
        .catch(err => {
            this.setState({errors: err.response.data.errors});
            this.getRideshares();
        });
    }

    setLocationInState = (locationId, locationType) => {
        const key = locationType + 'LocationId';
        this.setState({[key]: locationId});
    }

    render() {
        return (
            <div className="reactPageAppContainer">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Rideshare</Breadcrumb.Item>
                </Breadcrumb>
                <Header 
                    size="h1"
                    text="Rideshares"
                />
                {
                    !!this.state.errors ? (
                        <ErrorToast 
                            errors={this.state.errors}
                        />
                    ) : (
                        <React.Fragment />
                    )
                }
                <Container>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input 
                                width='7'
                                type='number' 
                                fluid 
                                label='Number of Passengers'
                                content='numberOfPassengers' 
                                onChange={this.handleChange} 
                                placeholder='0' 
                            />
                            <LocationDropdown
                                isAdmin={this.props.isAdmin}
                                displayText='Point Of Departure'
                                locationType='departure'
                                onChange={this.setLocationInState}
                            />
                            <LocationDropdown
                                isAdmin={this.props.isAdmin}
                                displayText='Point Of Arrival'
                                locationType='arrival'
                                onChange={this.setLocationInState}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Grid stackable>
                                <Grid.Column floated="left" width={4}>
                                    <Input
                                        className="rideshare-date-pickers"
                                        label="Leaving At" 
                                        type="date" 
                                        onChange={e => this.updateDate(e, 'leavingAt')} 
                                    />
                                </Grid.Column>
                                <Grid.Column floated="right" width={4}>
                                    <Input
                                        className="rideshare-date-pickers"
                                        label="Arriving At"
                                        type="date" 
                                        onChange={e => this.updateDate(e, 'arrivingAt')} 
                                    />
                                </Grid.Column>
                                <Grid.Column className="seeking-radios" width={2}>
                                    <Form.Field>
                                        Offering/Seeking?
                                    </Form.Field>
                                    <Form.Field>
                                        <Checkbox
                                            radio
                                            label='Offering'
                                            name='checkboxRadioGroup'
                                            checked={!this.state.seeking}
                                            onChange={(e) => this.updateTypeValue(e)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Checkbox
                                            radio
                                            label='Seeking'
                                            name='checkboxRadioGroup'
                                            checked={this.state.seeking}
                                            onChange={(e) => this.updateTypeValue(e)}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid>
                        </Form.Group>
                        <Form.TextArea
                            content='additionalInformation' 
                            onChange={this.handleChange}
                            label='Additional Information' 
                            placeholder='What else should people know about your trip... (max 500 characters)' 
                        />
                        <Form.Button onClick={e => this.addRideshare(e)}>Submit</Form.Button>
                    </Form>
                    <Table celled>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Contact</Table.HeaderCell>
                            <Table.HeaderCell>Offering/Seeking</Table.HeaderCell> 
                            <Table.HeaderCell>Point of Departure</Table.HeaderCell>
                            <Table.HeaderCell>Point of Arrival</Table.HeaderCell>
                            <Table.HeaderCell>Number of Seats Available</Table.HeaderCell>
                            <Table.HeaderCell>Leaving at</Table.HeaderCell>
                            <Table.HeaderCell>Arriving at</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        {
                            this.state.loading ? (
                                <BarLoader />
                            ) : (
                                <Table.Body>
                                    {this.state.rideshares && this.state.rideshares.map((rideshare, i) => (
                                        <RideshareRow
                                            key={i}
                                            currentUserId={this.props.userId}
                                            rideshare={rideshare}
                                        />
                                    ))}
                                </Table.Body>
                            )
                        }
                    </Table>
                </Container>
            </div>
        )
    }
}

export default Index;