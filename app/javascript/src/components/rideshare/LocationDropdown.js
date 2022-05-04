import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import axiosClient from '../../services/axios';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

export default function LocationDropdown(props) {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        axiosClient.get('location_points')
        .then(res => {
            if (isMounted) {
                setLocations(res.data);
            }
        })
        .catch(err => {
            dispatch(actions.setErrors("We're having trouble finding locations for your request. Please try again later"));
        });
        return () => {
            isMounted = false;
        }
    }, []);
    
    const getLocations = () => {
        axiosClient.get('location_points')
        .then(res => {
            setLocations(res.data);
        })
        .catch(err => {
            dispatch(actions.setErrors("We're having trouble finding locations for your request. Please try again later"));
        });
    }

    const deleteLocation = (e, id) => {
        e.preventDefault();
        axiosClient.delete(`location_points/destroy/${id}`)
        .then(() => {
            getLocations();
        })
        .catch(err => {
            dispatch(actions.setErrors("Cant delete a location already being used. First delete the rideshare."));
        });
    }
    
    function emitLocationId(e, event, locationType, name) {
        e.preventDefault();
        setLocation(name);
        props.onChange(event, locationType);
    }

    const addLocation = (e) => {
        let body = {
            location_name: location,
            location_description: ''
        }
        axiosClient.post('location_points/create', body)
        .then(() => {
            getLocations();
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    return (
        <React.Fragment>
            <Dropdown
                closeOnEscape={false}
                closeOnChange={false}
                className="location-dropdown"
                text={location !== '' ? location : props.displayText}
                labeled
            >
                <Dropdown.Menu className="location-dropdown-menu-wrap">
                    <Dropdown.Header content='Locations' />
                        <Dropdown.Menu scrolling className="location-dropdown-menu">
                            {locations.map((option, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <Dropdown.Item
                                            key={option.id}
                                            onClick={e => emitLocationId(
                                                e, 
                                                option.id, 
                                                props.locationType,
                                                option.location_name
                                            )} 
                                            value={location}
                                        >
                                            <p>{option.location_name}
                                                {props.isAdmin ? (
                                                    <Button
                                                        size="mini"
                                                        color="red" 
                                                        className="delete-location-btn" 
                                                        onClick={e => deleteLocation(e, option.id)}>
                                                        Delete
                                                    </Button>
                                                ) : (
                                                    <React.Fragment />
                                                )}
                                            </p>
                                        </Dropdown.Item>
                                    </React.Fragment>
                                )
                            })}
                        </Dropdown.Menu>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <p>Don't see your location above?</p>
                        <p>Add a new one here:</p>
                        <Input
                            onClick={e => e.stopPropagation()} 
                            onChange={e => setLocation(e.target.value)}
                            value={location}
                            onKeyDown={(e) =>
                                e.keyCode === 32 ? e.stopPropagation() : null
                            }
                        />
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Button
                            pointing="above" 
                            add={props.inputName}
                            onClick={e => addLocation(e)}>
                            Add New Location
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}