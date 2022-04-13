import React, { useEffect, useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
import RideshareModal from './RideshareModal';
import * as axios from 'axios';
import * as moment from 'moment';

export default function RideshareRow(props) {
    const [arrivalLocationName, setArrivalLocationName] = useState('');
    const [departureLocationName, setDepartureLocationName] = useState('');
    const [user, setUser] = useState('');
    const [loading, isLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const token = document.querySelector('meta[name="csrf-token"]').content;

    const deleteRideshare = (e, id) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/api/v1/rideshares/destroy/${id}`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(() => {
            props.getRideshares();
        })
        .catch(err => {
            console.log(err);
        });
        setOpen(false);
    }

    useEffect(() => {
        ['departure', 'arrival'].forEach(location => {
            const id = location === 'departure' ?
                props.rideshare.point_of_departure_id : 
                props.rideshare.point_of_arrival_id;
            axios({
                method: 'get',
                url: `/api/v1/location_points/get_single/${id}`,
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (location === 'departure') {
                    setDepartureLocationName(res.data.location_name);
                } else {
                    setArrivalLocationName(res.data.location_name);
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
        axios({
            method: 'get',
            url: `/api/v1/users/${props.rideshare.user_id}`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(res => {
            setUser({
                name: `${res.data.firstname} ${res.data.lastname} (${res.data.email})`,
                email: res.data.email,
                phoneNumber: res.data.phone_number
            });
        })
        .catch(err => {
        });
    }, []);

    return (
        <React.Fragment>
            { open ? (
                <RideshareModal
                    user={user}
                    rideshare={props.rideshare}
                    arrivalLocationName={arrivalLocationName}
                    departureLocationName={departureLocationName} 
                    open={open}
                    closeModal={() => setOpen(false)}
                    deleteRideshare={e => deleteRideshare(e, props.rideshare.id)}
                />
            ) : (
                <Table.Row className="row-hover" onClick={() => setOpen(true)}key={props.rideshare.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{arrivalLocationName}</Table.Cell>
                    <Table.Cell>{departureLocationName}</Table.Cell>
                    <Table.Cell>{props.rideshare.number_of_passengers}</Table.Cell>
                    <Table.Cell>{moment(props.rideshare.departing_at).format("DD/MM/YYYY, h:mm a")}</Table.Cell>
                    <Table.Cell>{moment(props.rideshare.arriving_at).format("DD/MM/YYYY, h:mm a")}</Table.Cell>
                </Table.Row>
            )}
        </React.Fragment>

    );
}