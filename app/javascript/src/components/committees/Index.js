import React, { useEffect, useState } from 'react';
import Title from '../shared/PageTitle';
import { Accordion, Icon, Form, Button } from 'semantic-ui-react'
import styled from 'styled-components';
import axiosClient from '../../services/axios';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const CommitteeForm = styled.div`
margin-bottom: 10px;
max-width: 40%;
`;

function CommitteeUpload(props) {
    const [committeeName, setCommitteeName] = useState(null);
    const [committeeUrl, setCommitteeUrl] = useState('');
    const dispatch = useDispatch();

    const postCommittee = (e) => {
        e.preventDefault();
        let body = {
            name: committeeName,
            url: committeeUrl   
        }
        axiosClient.post(`committees/create`, body)
        .then(res => {
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
              <Form>
                    <Form.Field>
                        <label>Committee Name</label>
                        <input placeholder='title' 
                            onChange={e => setCommitteeName(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Committee Link</label>
                        <input placeholder='title' 
                            onChange={e => setCommitteeUrl(e.target.value)}
                        />
                    </Form.Field>
                <Button type='submit' onClick={e => postCommittee(e)}>Submit</Button>
            </Form>
        </React.Fragment>

    );
}

export default function Forms(props) {
    const [committees, setCommittees] = useState([]);
    const [activeIndex, setActiveIndex] = useState([]);

    const dispatch = useDispatch();

    const deleteCommittee = (e, committeeId) => {
        e.preventDefault();
        axiosClient.delete(`committees/destroy/${committeeId}`)
        .then(res => {
        })
        .catch(err => {
            dispatch(actions.setErrors(
                "We're having trouble finding rideshares for your request. Please try again later"
            ));
        });
    }

    useEffect(() => {
        let isMounted = true;
        axiosClient.get(`committees`)
        .then(res => {
            console.log(res)
            if (isMounted) {
                setCommittees(res.data)
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(
                "We're having trouble finding rideshares for your request. Please try again later"
            ));
        });
        return () => {
            isMounted = false;
        }
    }, []);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        console.log(index, activeIndex)
        const newIndex = activeIndex === index ? -1 : index
    
        setActiveIndex({ activeIndex: newIndex })
      }
    
      
    return (
        <div className="reactPageAppContainer">
            <Title 
                size="h1"
                text="Committees"
            />
            <CommitteeForm>
                {
                    props.isAdmin ? (
                        <React.Fragment>
                            <CommitteeUpload 
                            />  
                        </React.Fragment>   
                    ) : (
                        <React.Fragment />
                    )
                }
            </CommitteeForm>
            <Accordion styled>
            {
                committees.map((committee, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Accordion.Title
                                active={true}
                                index={0}
                                onClick={handleClick}
                            >
                                <Icon name='dropdown' />
                                {committee.name}
                            </Accordion.Title>
                            <Accordion.Content active={true}>
                                <a href={committee.url}>Click here for more info</a>
                                {
                                    props.isAdmin ? (
                                        <React.Fragment>
                                            <Button onClick={e => deleteCommittee(e, committee.id)} size='mini' circular color='red' floated='right' icon>
                                                        <Icon name='trash' />
                                                    </Button>
                                        </React.Fragment>   
                                    ) : (
                                        <React.Fragment />
                                    )
                                }
                            </Accordion.Content>
                        </React.Fragment>
                    )
                })
            }     
            </Accordion>
      </div>
    )
}
