import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import BarLoader from 'react-spinners/BarLoader'
import { 
    Breadcrumb,
}  from 'react-bootstrap';

import {
    Card, Feed, Grid
} from 'semantic-ui-react'

import { useDispatch } from 'react-redux';
import axiosClient from '../../services/axios';

import moment from 'moment';


export default function Show(props) {
    const [loading, setLoading] = useState(false);
    const [showedUser, setShowedUser] = useState(null)

    const dispatch = useDispatch();

    useEffect(() =>  {
        dispatch(actions.loadingStart());
        let mounted = true;
        axiosClient.get(`users/profile/${props.match.params.id}`)
        .then(res => {
            if (mounted) {
                console.log(res.data)
                setShowedUser(res.data)
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(
                "We're having trouble finding this user"
            ));
        });
        dispatch(actions.loadingFinish());
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div className="reactPageAppContainer">
            {
                loading ? (
                    <BarLoader />
                ) : (
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
                            <Breadcrumb.Item active href="/users">{showedUser?.user?.firstname } {showedUser?.user?.lastname }</Breadcrumb.Item>
                        </Breadcrumb>
                        <Grid stackable>

                        <Grid.Row columns={2} stretched>
                            <Grid.Column>
                        {
                            showedUser?.articles ? (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Articles</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        {
                                            showedUser.articles.length > 0 ?
                                            (
                                                <Feed>
                                                {
                                                    showedUser.articles.map((article, i) => (
                                                        <Feed.Event key={i}>
                                                            <Feed.Content>
                                                                <Feed.Date content={moment(article.created_at).add(1, 'days').format("MM/DD/YYYY")} />
                                                                <Feed.Summary>
                                                                    <a href={`/articles/${article.slug}`}>{article.title}</a>
                                                                </Feed.Summary>
                                                            </Feed.Content>
                                                        </Feed.Event>
                                                    ))
                                                }
                                                </Feed>
                                            ) : (
                                                <Feed>
                                                    <Feed.Event>
                                                        <Feed.Content>
                                                            <Feed.Summary>
                                                                No articles
                                                            </Feed.Summary>
                                                        </Feed.Content>
                                                    </Feed.Event>
                                                </Feed>
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            ) : (
                                <div></div>
                            )
                        }
                        </Grid.Column>
                        <Grid.Column>
                        {
                            showedUser?.events ? (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Events</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        {
                                            showedUser.events.length > 0 ?
                                            (
                                                <Feed>
                                                {
                                                    showedUser.events.map((event, i) => (
                                                        <Feed.Event key={i}>
                                                            <Feed.Content>
                                                                <Feed.Summary>
                                                                    <a href={`/events/${event.id}`}>{event.events}</a>
                                                                </Feed.Summary>
                                                            </Feed.Content>
                                                        </Feed.Event>
                                                    ))
                                                }
                                                </Feed>
                                            ) : (
                                                <Feed>
                                                    <Feed.Event>
                                                        <Feed.Content>
                                                            <Feed.Summary>
                                                                No events
                                                            </Feed.Summary>
                                                        </Feed.Content>
                                                    </Feed.Event>
                                                </Feed>
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            ) : (
                                <div></div>
                            )
                        }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                        {
                            showedUser?.cabins ? (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Cabins</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        {
                                            showedUser.cabins.length > 0 ?
                                            (
                                                <Feed>
                                                {
                                                    showedUser.cabins.map((cabin, i) => (
                                                        <Feed.Event key={i}>
                                                            <Feed.Content>
                                                                <Feed.Date content={moment(cabin.created_at).add(1, 'days').format("MM/DD/YYYY")} />
                                                                <Feed.Summary>
                                                                    <a href={`/cabins/${cabin.id}`}>{cabin.name}</a>
                                                                </Feed.Summary>
                                                            </Feed.Content>
                                                        </Feed.Event>
                                                    ))
                                                }
                                                </Feed>
                                            ) : (
                                                <Feed>
                                                    <Feed.Event>
                                                        <Feed.Content>
                                                            <Feed.Summary>
                                                                No cabins
                                                            </Feed.Summary>
                                                        </Feed.Content>
                                                    </Feed.Event>
                                                </Feed>
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            ) : (
                                <div></div>
                            )
                        }
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    </div>
                )
            }
        </div>
    )
}