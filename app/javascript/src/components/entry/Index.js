import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Card, Image, Button, List, Message } from 'semantic-ui-react'
import Header from '../shared/PageTitle';
import axiosClient from '../../services/axios';

import './entry.css';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const NonAuthWrapper = styled.div`
    padding-top: 30px;
    margin: 0px auto;
`;

const RailsLink = styled.a`
    text-decoration: none;
    color: white;
`;

const getBreakfast = () => {
    let breakfast;
    let d = new Date().getDay();
    switch(d) {
        case 2:
        case 4:
        case 6:
            breakfast = 'Egg Day'
            break;
        case 1:
        case 5:
            breakfast = 'Pancake Day'
            break;
        case 3:
            breakfast = 'French Toast Day'
            break;
        case 0:
            breakfast = 'Sunday Brunch'
            break;
        default:
            return;
    }
    return breakfast;
}

export default function Index(props) {
    const [campers, setCampers] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [thisWeeksEvents, setThisWeeksEvents] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadingStart());
        let mounted = true;
        axiosClient.get('entry/initial_payload')
        .then(res => {
            if (mounted) {
                setIsAuthenticated(res.data.logged_in);
                getArticles();
                getCampers();
                getThisWeeksEvents();
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
        dispatch(actions.loadingFinish());
        return () => {
            mounted = false;
        }
    }, []);

    const getArticles = () => {
        axiosClient.get('entry/recent_articles')
        .then(res => {
            setRecentArticles(res.data.articles)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    const getCampers = () => {
        axiosClient.get('entry/campers')
        .then(res => {
            setCampers(res.data.campers)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    const getThisWeeksEvents = () => {
        axiosClient.get('entry/this_weeks_events')
        .then(res => {
            setThisWeeksEvents(res.data.events)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    return (
        <React.Fragment>
            { isAuthenticated ? (
                <div className='reactPageAppContainer'>
                    <Grid>
                        <Grid.Row>
                            <Header 
                                size='h1'
                                text='Iron City Fishing Club'
                            />
                        </Grid.Row>
                    </Grid>
                    <Grid stackable divided='vertically'>
                        <Message info>
                            <Message.Header><a href="https://docs.google.com/spreadsheets/d/1NZjfzPO2p5lOkVMGsbiLtDPN6q-SlLwYF2Ad_vqGeSg/edit?usp=sharing">Click Here For Covid Dashboard</a></Message.Header>
                        </Message>
                        <Grid.Row columns={3} stretched>
                            <Grid.Column>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>This Week's Events</Card.Header>
                                        <Card.Description>
                                            {
                                                thisWeeksEvents && thisWeeksEvents.length > 0 ? (
                                                    thisWeeksEvents.map((event, i) => (
                                                        <a key={i} href={`/events/${event.id}`}>{event.events}</a>
                                                    ))
                                                ) : (
                                                    <p>Looks like there are no events this week</p>
                                                )
                                            }
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>                              
                                <Image className='front-page-img' src='DSC_0323.jpg' />
                            </Grid.Column>
                            <Grid.Column>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Emergency Contact Information</Card.Header>
                                        <Card.Description>
                                            <List>
                                                <List.Item>Office Telephone: 705-375-2300 (in season only)</List.Item>
                                                <List.Item>Moe's Number: 705-746-6699</List.Item>
                                                <List.Item>Lisa's Number:  705-346-1191</List.Item>
                                                <List.Item>Gregoire Home Telephone: 705-375-5633</List.Item>
                                                <List.Item>Pay Telephone: 705-375-9907</List.Item>
                                            </List>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Card>
                                    <iframe 
                                        src='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1459440.1988828832!2d-80.56660371920148!3d44.403018062644065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x882b394ac02dd491%3A0xb41d5de9c4030ec5!2sToronto%20Pearson%20International%20Airport%2C%20Silver%20Dart%20Drive%2C%20Mississauga%2C%20ON%2C%20Canada!3m2!1d43.6777176!2d-79.6248197!4m5!1s0x4d2af89d9f168371%3A0xf170c239ee53f14c!2sMacTier%2C%20ON%2C%20Canada!3m2!1d45.139272999999996!2d-79.771827!5e0!3m2!1sen!2sus!4v1572568118601!5m2!1sen!2sus' 
                                        height='300px' 
                                        frameBorder='0' 
                                        allowFullScreen=''>
                                    </iframe>
                                    <Card.Content>
                                        <Card.Header>Traffic</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Current traffic from Pearson Airport to Mactier, On</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            Current traffic from Pearson Airport to Mactier, ON
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card>                                
                                    <Card.Content>
                                        <Card.Header>Recent Articles</Card.Header>
                                        <Card.Description>
                                            {
                                                !!recentArticles && recentArticles.length > 0 ? (
                                                    <List>
                                                        {
                                                            recentArticles.map((article, i) => {
                                                                const url = `/articles/${article.slug}`
                                                                return (
                                                                    <List.Item key={i} href={url}>
                                                                        {article.title}
                                                                    </List.Item>
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                ) : (
                                                    <React.Fragment />
                                                )
                                            }
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                                <Card>                                
                                    <Card.Content>
                                        <Card.Header>What's for Breakfast?</Card.Header>
                                        <Card.Description>
                                            {getBreakfast()}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Image className='front-page-img' src='DSC_0311.jpg' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            ) : (
                <React.Fragment>
                    <NonAuthWrapper>
                        <Header
                            align='center' 
                            size='h1'
                            text='Iron City Fishing Club'
                        />
                        <Card className='centered-login-portal'>
                            <Image 
                                className='login-portal-image'
                                src='DSC_0345.jpg' 
                                wrapped ui={false} 
                            />
                            <Card.Content>
                            <Card.Description>
                                <Button 
                                    fluid
                                    positive
                                >
                                    <RailsLink href='/sessions/new'>
                                        Log In Here
                                    </RailsLink></Button>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a href='/users/new'>
                                    Dont Have an Account Yet? Sign Up Here
                                </a>
                            </Card.Content>
                        </Card>
                    </NonAuthWrapper>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}