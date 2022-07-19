import React, { useEffect, useState } from 'react';
import { Tab, Divider, Grid, Button, Icon } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Header from '../shared/PageTitle';
import DocumentUpload from '../shared/DocumentUpload';
import axiosClient from '../../services/axios';

import styled from 'styled-components';

const RailsLink = styled.a`
`;

export default function Index(props) {
    const [backBayBilges, setBackBayBilges] = useState([]);
    const [dailyBilges, setDailyBilges] = useState([]);

    const deleteDoc = (e, formId) => {
        e.preventDefault();
        axiosClient.delete(`documents/destroy/${formId}`)
        .then(res => {
        })
        .catch(err => {
            setError(err.response.data.errors);
        });
    }

    const panes = [
        {
            menuItem: 'Back Bay Bilges (1993-2013)',
            render: () => 
                <Tab.Pane>
                    <ListGroup>
                        {
                            !!backBayBilges && backBayBilges.length > 0 ? (
                                <React.Fragment>
                                    {
                                        backBayBilges.map((backBayBilge, i) => (
                                            <ListGroupItem
                                                key={i}
                                            >
                                                <RailsLink 
                                                    href={backBayBilge.document.url} 
                                                    target="_blank">
                                                        {backBayBilge.document_title}
                                                </RailsLink>
                                                {
                                                    props.isAdmin ? (
                                                        <Button onClick={e => deleteDoc(e, backBayBilge.id)} size='mini' circular color='red' floated='right' icon>
                                                            <Icon name='trash' />
                                                        </Button>
                                                    ) : (
                                                        <React.Fragment />
                                                    )
                                                }
                                            </ListGroupItem>
                                        ))
                                    }
                                </React.Fragment>
                            ) : (
                                <React.Fragment />
                            )
                        }
                    </ListGroup>
                </Tab.Pane>,
        },
        { 
            menuItem: 'Daily Bilges (2001 - 2021)', 
            render: () => 
            <Tab.Pane>
                <ListGroup>
                    {
                            !!dailyBilges && dailyBilges.length > 0 ? (
                                <React.Fragment>
                                    {
                                        dailyBilges.map((dailyBilge, i) => (
                                            <ListGroupItem
                                                key={i}
                                            >
                                                <RailsLink 
                                                    href={dailyBilge.document.url} 
                                                    target="_blank">
                                                        {dailyBilge.document_title}
                                                </RailsLink>
                                                {
                                                    props.isAdmin ? (
                                                        <Button onClick={e => deleteDoc(e, dailyBilge.id)} size='mini' circular color='red' floated='right' icon>
                                                            <Icon name='trash' />
                                                        </Button>
                                                    ) : (
                                                        <React.Fragment />
                                                    )
                                                }
                                            </ListGroupItem>
                                        ))
                                    }
                                </React.Fragment>
                            ) : (
                                <React.Fragment />
                            )
                        }
                </ListGroup>
            </Tab.Pane> 
        },
    ]

    useEffect(() => {
        ['backBayBilges', 'dailyBilges'].forEach(archive => {
            axiosClient.get(`documents/index/${archive}`)
            .then(res => {
                archive === 'backBayBilges' ? 
                    setBackBayBilges(res.data) :
                    setDailyBilges(res.data);
            })
            .catch(err => {
                setError(err)
            });
        })
    }, []);

    return (
        <div className="reactPageAppContainer">
            <Header 
                size="h1"
                text="Archives"
            />
            {
                props.isAdmin ? (
                    <React.Fragment>
                        <Grid columns={2}>
                            <Grid.Column>
                                <DocumentUpload 
                                    folderName='backBayBilges'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <DocumentUpload 
                                    folderName='dailyBilges'
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider />
                    </React.Fragment>
                ) : (
                    <React.Fragment />
                )
            }
            <Tab panes={panes}></Tab>
        </div>
    )
}
