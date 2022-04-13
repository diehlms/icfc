import React, { useEffect, useState } from 'react'
import { Dropdown, Input, Button, Grid, Label } from 'semantic-ui-react'
import * as axios from 'axios';

export default function LocationDropdown(props) {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        axios.get('/api/v1/location_points')
        .then(res => {
            setLocations(res.data);
        })
        .catch(err => {
            console.log("We're having trouble finding locations for your request. Please try again later")
        });
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;

    const deleteLocation = (e, id) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/api/v1/location_points/destroy/${id}`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(() => {
            setLocations([]);
            getLocations();
        })
        .catch(err => {
            setLocations([]);
            getLocations();
        });
    }
    
    function emitLocationId(e, event, locationType, name) {
        e.preventDefault();
        setLocation(name);
        props.onChange(event, locationType);
    }

    const addLocation = (e) => {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let body = {
            location_name: location,
            location_description: ''
        }
        axios({
            method: 'post',
            url: `/api/v1/location_points/create`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(body)
        }).then(() => {
            getLocations();
        })
        .catch(err => {
            getLocations();
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