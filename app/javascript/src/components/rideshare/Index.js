import React, { useEffect, useState } from 'react'
import Header from '../shared/PageTitle';
import BarLoader from 'react-spinners/BarLoader';
import { Table, Form, Input, Grid, Container, Checkbox } from 'semantic-ui-react';
import { Breadcrumb } from 'react-bootstrap';
import axiosClient from '../../services/axios';
import "./rideshare.css";

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

import RideshareRow from './RideshareItem';
import LocationDropdown from './LocationDropdown';

const initialFormState = {
    numberOfPassengers: 0,
    additionalInformation: '',
    arrivingAt: null,
    departingAt: null,
    departureLocationId: null,
    arrivalLocationId: null,
    seeking: true
}

export default function Rideshare(props) {
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [rideshares, setRideshares] = useState([]);
    const [formState, setFormState] = useState(initialFormState);

    const dispatch = useDispatch();

    useEffect(() => {
        setSessionId(props.userId);
        let isMounted = true;
        axiosClient.get('rideshares')
        .then(res => {
            if (isMounted) {
                setRideshares(res.data);
            }
        })
        .catch(err => {
            setRideshares([]);
            dispatch(actions.setErrors(
                "We're having trouble finding rideshares for your request. Please try again later"
            ));
        });
        return () => {
            isMounted = false;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({...prevState, [name]: value }));
    };

    const getRideshares = () => {
        dispatch(actions.loadingStart());
        axiosClient.get('rideshares')
        .then(res => {
            setRideshares(res.data);
        })
        .catch(err => {
            setRideshares([]);
            dispatch(actions.setErrors(
                "We're having trouble finding rideshares for your request. Please try again later"
            ));
        });
        dispatch(actions.loadingFinish());
    }

    const updateTypeValue = (e) => {
        e.preventDefault();
        setFormState(prevState => ({...prevState, seeking: !formState.seeking }));
    }

    const addRideshare = (e) => {
        e.preventDefault();
        dispatch(actions.loadingStart());
        let body = {
            number_of_passengers: formState.numberOfPassengers,
            additional_information: formState.additionalInformation,
            point_of_arrival_id: formState.departureLocationId, 
            point_of_departure_id: formState.arrivalLocationId,
            user_id: props.userId,
            arriving_at: formState.arrivingAt,
            departing_at: formState.leavingAt,
            seeking: formState.seeking
        }
        axiosClient.post('rideshares/create', body)
        .then(() => {
            getRideshares();
            setFormState(initialFormState);
            dispatch(actions.setSuccessMessages("Rideshare Added!"))
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
        dispatch(actions.loadingFinish())
    }

    const setLocationInState = (locationId, locationType) => {
        const key = locationType + 'LocationId';
        setFormState(prevState => ({...prevState, [key]: locationId }))
    }

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
            <Container>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            width='7'
                            type='number' 
                            fluid 
                            name='numberOfPassengers'
                            label='Number of Passengers'
                            content='numberOfPassengers' 
                            onChange={handleChange} 
                            placeholder='0' 
                        />
                        <LocationDropdown
                            isAdmin={props.isAdmin}
                            displayText='Point Of Departure'
                            locationType='departure'
                            onChange={setLocationInState}
                        />
                        <LocationDropdown
                            isAdmin={props.isAdmin}
                            displayText='Point Of Arrival'
                            locationType='arrival'
                            onChange={setLocationInState}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Grid stackable>
                            <Grid.Column floated="left" width={4}>
                                <Input
                                    name='leavingAt'
                                    className="rideshare-date-pickers"
                                    label="Leaving At" 
                                    type="date" 
                                    onChange={handleChange} 
                                />
                            </Grid.Column>
                            <Grid.Column floated="right" width={4}>
                                <Input
                                    name='arrivingAt'
                                    className="rideshare-date-pickers"
                                    label="Arriving At"
                                    type="date" 
                                    onChange={handleChange} 
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
                                        checked={!formState.seeking}
                                        onChange={(e) => updateTypeValue(e)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Seeking'
                                        name='checkboxRadioGroup'
                                        checked={formState.seeking}
                                        onChange={(e) => updateTypeValue(e)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid>
                    </Form.Group>
                    <Form.TextArea
                        name='additionalInformation'
                        content='additionalInformation' 
                        onChange={handleChange}
                        label='Additional Information' 
                        placeholder='What else should people know about your trip... (max 500 characters)' 
                    />
                    <Form.Button onClick={e => addRideshare(e)}>Submit</Form.Button>
                </Form>
                {
                    loading ? (
                        <BarLoader />
                    ) : (
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
                            <Table.Body>
                                {rideshares && rideshares.map((rideshare, i) => (
                                    <RideshareRow
                                        key={i}
                                        currentUserId={props.userId}
                                        rideshare={rideshare}
                                    />
                                ))}
                            </Table.Body>
                        </Table>
                    )
                }
            </Container>
        </div>
    )
}