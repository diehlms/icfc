import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import RideshareModal from './RideshareModal';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import axiosClient from '../../services/axios';

import * as moment from 'moment';

export default function RideshareRow(props) {
    const [arrivalLocationName, setArrivalLocationName] = useState('');
    const [departureLocationName, setDepartureLocationName] = useState('');
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const deleteRideshare = (e, id) => {
        e.preventDefault();
        axiosClient.delete(`rideshares/destroy/${id}`)
        .then(() => {
            props.getRideshares();
        })
        .catch(err => {
            dispatch(actions.setErrors(
                "Sorry. Looks like that didn't work. Please try again later."
            ));
        });
        setOpen(false);
    }

    useEffect(() => {
        let mounted = true;
        ['departure', 'arrival'].forEach(location => {
            const id = location === 'departure' ?
                props.rideshare.point_of_departure_id : 
                props.rideshare.point_of_arrival_id;
            axiosClient.get(`location_points/get_single/${id}`)
            .then(res => {
                if (mounted) {
                    if (location === 'departure') {
                        setDepartureLocationName(res.data.location_name);
                    } else {
                        setArrivalLocationName(res.data.location_name);
                    }
                }
            })
            .catch(err => {
                dispatch(actions.setErrors(
                    "Sorry. Looks like that didn't work. Please try again later."
                ));
            });
        });
        axiosClient.get(`users/${props.rideshare.user_id}`)
        .then(res => {
            if (mounted) {
                setUser({
                    name: `${res.data.firstname} ${res.data.lastname} (${res.data.email})`,
                    email: res.data.email,
                    phoneNumber: res.data.phone_number
                });
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(
                "Sorry. Looks like that didn't work. Please try again later."
            ));
        });
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <React.Fragment>
            { open ? (
                <RideshareModal
                    currentUserId={props.currentUserId}
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
                    <Table.Cell>{props.rideshare.seeking ? 'Seeking' : 'Offering'}</Table.Cell>
                    <Table.Cell>{arrivalLocationName}</Table.Cell>
                    <Table.Cell>{departureLocationName}</Table.Cell>
                    <Table.Cell>{props.rideshare.number_of_passengers}</Table.Cell>
                    <Table.Cell>{moment(props.rideshare.departing_at).format("DD/MM/YYYY")}</Table.Cell>
                    <Table.Cell>{moment(props.rideshare.arriving_at).format("DD/MM/YYYY")}</Table.Cell>
                </Table.Row>
            )}
        </React.Fragment>

    );
}