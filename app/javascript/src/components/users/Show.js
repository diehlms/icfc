import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BarLoader from 'react-spinners/BarLoader'
import { 
    Breadcrumb,
    ListGroup,
    ListGroupItem
}  from 'react-bootstrap';
import styled from 'styled-components';

const CardRow = styled.div`
    padding: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;

const CardWrapper = styled.div`
    border: 1px solid grey;
    border-radius: 3px;
    margin: 15px;
    display: inline-block;
    padding: 7px;
    width: 25vw;
`;

const SectionTitle = styled.div`
    margin: 0 auto;
    text-size: 16px;
    font-weight: bold;
`;

function UserArticles(props) {
    let articleList;
    if (props.articles) {
        articleList = props.articles.map(article => 
            <ListGroupItem key={article.id}>
                <a href={`/articles/${article.slug}`}>{article.title}</a>
            </ListGroupItem>
        )
    }
    return (
        <CardWrapper>
            <SectionTitle>Articles:</SectionTitle>
            { props.loading || props.articles.length === 0 ? (
                <p>This user hasn't posted any articles yet</p>
            ) : (
                <ListGroup>
                    {articleList}
                </ListGroup>
            )}
        </CardWrapper>
    );
}

function UserCabins(props) {
    let cabinList;
    if (props.cabins) {
        cabinList = props.cabins.map(cabin => 
            <ListGroupItem key={cabin.id}>
                <a href={`/cabins/${cabin.id}`}>{cabin.name}</a>
            </ListGroupItem>
        )
    }
    return (
        <CardWrapper>
            <SectionTitle>Cabins:</SectionTitle>
            { props.loading || props.cabins.length === 0 ? (
                <p>This user hasn't posted any cabins yet</p>
            ) : (
                <ListGroup>
                    {cabinList}
                </ListGroup>
            )}
        </CardWrapper>
    );
}

function UserEvents(props) {
    let eventList;
    if (props.events) {
        eventList = props.events.map(event => 
            <ListGroupItem key={event.id}>
                <a href={`/events/${event.id}`}>{event.events}</a>
            </ListGroupItem>
        )
    };
    return (
        <CardWrapper>
            <SectionTitle>Events:</SectionTitle>
            { props.loading || props.events.length === 0 ? (
                <p>This user hasn't posted any events yet</p>
            ) : (
                <ListGroup>
                    {eventList}
                </ListGroup>
            )}
        </CardWrapper>
    );
}

function UserBio(props) {
    let phoneNumber = "";
    if (props.user) {
        const cleaned = ("" + props.user.phone_number).replace(/\D/g, "");
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            phoneNumber = " | " + "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
    }
    return (
        <CardRow>
            <div>
                {props.loading || !props.user ? (
                    <BarLoader />
                ) : (
                    <React.Fragment>
                        <h1>{props.user.username}</h1>
                        <h3>{`${props.user.email} ${phoneNumber}`}</h3>
                    </React.Fragment>
                )}
                <div>
                    {props.children}
                </div>
            </div>
        </CardRow>
    );
}

class Show extends React.Component {
    state = {
        showedUser: null
    }

    componentDidMount() {
        this.props.onFetchUsers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            if (this.props.users[1] && this.props.users[1].users) {
                this.props.users[1].users.filter(user => {
                    if (user.slug == this.props.match.params.id) {
                        this.setState({
                            showedUser: user
                        });
                        this.props.onFetchArticles(user.id);
                        this.props.onFetchCabins(user.id);
                        this.props.onFetchEvents(user.id);
                    }
                });
            }
        }
    }

    render() {
        let loading = this.props.loading;
        let articles = [];
        let events = [];
        let cabins = [];

        if (this.props.articles[1] && this.props.articles[1].articles) {
            this.props.articles[1].articles.map(article => {
                articles.push(article);
            });
        }

        if (this.props.cabins[1] && this.props.cabins[1].cabins) {
            this.props.cabins[1].cabins.map(cabin => {
                cabins.push(cabin);
            });
        }

        if (this.props.events[1] && this.props.events[1].events) {
            this.props.events[1].events.map(event => {
                events.push(event);
            });
        }

        return (
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
                    {this.state.showedUser ? (
                        <Breadcrumb.Item active>{`${this.state.showedUser.firstname} ${this.state.showedUser.lastname}`}</Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item active>User Not Loaded Yet</Breadcrumb.Item>
                    )}
                </Breadcrumb>
                <UserBio 
                    user={this.state.showedUser}
                    loading={loading.loading}
                >              
                    <UserArticles 
                        articles={articles}
                        loading={loading.loading}
                    />
                    <UserCabins 
                        cabins={cabins}
                        loading={loading.loading}
                    />
                    <UserEvents 
                        events={events}
                        loading={loading.loading}
                    />  
                </UserBio>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        users: state.users,
        loading: state.loading,
        events: state.events,
        cabins: state.cabins
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: (id) => dispatch(actions.fetchArticles(id)),
        onFetchCabins: (id) => dispatch(actions.fetchCabins(id)),
        onFetchEvents: (id) => dispatch(actions.fetchEvents(id)),
        onFetchUsers: () => dispatch(actions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
