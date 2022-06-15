import React, { useEffect, useState } from 'react';
import Title from '../shared/PageTitle';
import { Tab, Divider, Button, Icon } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
import DocumentUpload from '../shared/DocumentUpload';
import axiosClient from '../../services/axios';

const RailsLink = styled.a`
`;

export default function Forms(props) {
    const [forms, setForms] = useState([]);

    const panes = [
        {
            menuItem: 'Miscellaneous',
            render: () => 
            <Tab.Pane>
                <ListGroup>
                    {/* <ListGroupItem><RailsLink href="/2019_LeaderTeam_Application.pdf" target="_blank">Leadership Team Application</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/2019_LeaderTeamApplicationInformation.pdf" target="_blank">Leadership Team Information</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/2020_Application for Wait Staff.doc" target="_blank">Wait Staff Application</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/2020_Application Information for Wait Staff.doc" target="_blank">Wait Staff Information</RailsLink></ListGroupItem> */}
                    <ListGroupItem><RailsLink href="/2020 Wait Staff Regulations.pdf" target="_blank">Wait Staff Regulations</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/2020_Emergency Medical Form for Wait Staff.doc" target="_blank">Emergency Medical Form for Wait Staff</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/2015_SpecialDietaryRequestForm.pdf" target="_blank">Dietary Request Forms</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/WorkOrder.pdf" target="_blank">Work Order Forms</RailsLink></ListGroupItem>
                    {
                        !!forms && forms.length > 0 ? (
                            <React.Fragment>
                                {
                                    forms.map((form, i) => (
                                        <ListGroupItem
                                            key={i}
                                        >
                                            <RailsLink 
                                                href={form.document.url} 
                                                target="_blank">
                                                    {form.document_title}
                                            </RailsLink>
                                            {
                                                props.isAdmin ? (
                                                    <Button onClick={e => deleteDoc(e, form.id)} size='mini' circular color='red' floated='right' icon>
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
        }
    ];

    const deleteDoc = (e, formId) => {
        e.preventDefault();
        axiosClient(`documents/destroy/${formId}`)
        .then(res => {
        })
        .catch(err => {
            setError(err.response.data.errors);
        });
    }

    useEffect(() => {
        let isMounted = true;
        axiosClient.get(`documents/index/forms`)
        .then(res => {
            if (isMounted) {
                setForms(res.data)
            }
        })
        .catch(err => {
            setError(err.response.data.errors);
        });
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <div className="reactPageAppContainer">
            <Title 
                size="h1"
                text="Forms"
            />
            {
                props.isAdmin ? (
                    <React.Fragment>
                        <DocumentUpload 
                            folderName='forms'
                        />
                        <Divider />    
                    </React.Fragment>   
                ) : (
                    <React.Fragment />
                )
            }              
            <Tab panes={panes} />
        </div>
    )
}
