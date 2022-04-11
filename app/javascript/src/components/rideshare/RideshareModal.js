import React from 'react'
import { Modal, Header,  Statistic, Divider, Container, Button } from 'semantic-ui-react';
import * as moment from 'moment';

export default function RideshareModal(props) {
    console.log(props.rideshare)
    return (
        <Modal
            size='tiny'
            onClose={props.closeModal}
            open={props.open}
        >
            <Modal.Content>
                <Modal.Description>
                    <Button 
                        color='red'
                        onClick={e => props.deleteRideshare(e)}
                    >
                        Delete</Button>
                    <Container text>
                        <Statistic horizontal>
                            <Statistic.Value>{props.rideshare.number_of_passengers}</Statistic.Value>
                            <Statistic.Label>Number of seats available</Statistic.Label>
                        </Statistic>
                        <Divider />
                        <Header as='h2'>Contact</Header>
                        <p>{props.user.name}</p>
                        <p>{props.user.phoneNumber}</p>
                        <Divider />
                        <Header as='h2'>Ride Details</Header>
                        <p>Leaving {props.arrivalLocationName} on {moment(props.rideshare.departing_at).format("DD/MM/YYYY")}</p>
                        <p>Arriving at {props.departureLocationName} on {moment(props.rideshare.arriving_at).format("DD/MM/YYYY")}</p>
                        <p>Additional Info: {props.rideshare.additional_information}</p>
                    </Container>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}