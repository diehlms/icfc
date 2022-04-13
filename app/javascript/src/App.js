import React from 'react';
import Routes from './routes/Index';

import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Menu, Segment, Sidebar, Divider, Checkbox } from 'semantic-ui-react';
import * as axios from 'axios';


const AppContainer = styled.div`
    'margin: 0px auto;'
`;

const ContentContainer = styled.div`
    @media only screen and (max-width: 700px) { 
        margin-left: 10%;
    }
    ${props => props.centered ? 'margin: 0px auto;' : 'margin-left: 22%;'}
    padding: ${props => props.centered ? '0px' : '33px'};
    width: 75%;
`;

class App extends React.Component {
    state = {
        isLoading: false, 
        activeIndex: 0,
        isAuthenticated: false,
        isAdmin: false,
        showSidebar: true
    }

    componentDidMount = () => {
        const initialPayload = this.props;
        if (!!initialPayload.userId && initialPayload.userId !== null) {
            this.setState({
                isAuthenticated: true,
                isAdmin: initialPayload.isAdmin
            });
            this.getInitialPayload();   
        }
    }

    getInitialPayload() {
        this.setState({
            loading: true
        })
        axios.get('/api/v1/entry/initial_payload')
        .then(res => {
            this.setState({
                isLoading: false,
                inSeasonResLink: res.data.inseason_reservation_link,
                outSeasonResLink: res.data.outseason_reservation_link
            })
        })
        .catch(err => {
            this.setState({
                errorMessage: "We're having trouble finding your request. Please try again later",
                isLoading: false
            });
        });
    }

    setSidebarVisible = (e) => {
        e.preventDefault();
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    render() {
        const sidebarLinks = [{
            "sectionName": "Camp Info",
            "links": [{
                    "link": "/forms",
                    "displayName": "Forms",
                    railsLink: false
                }, {
                    "link": "/history",
                    "displayName": "History",
                    railsLink: false
                },{
                    "link": "/by-laws",
                    "displayName": "By-Laws",
                    railsLink: false
                },{
                    "link": "/membership",
                    "displayName": "Membership",
                    railsLink: false
                },{
                    "link": "/customs",
                    "displayName": "Customs & Traditions",
                    railsLink: false
                },{
                    "link": "/charitable-gifts",
                    "displayName": "Charitable Gifts",
                    railsLink: false
                },{
                    "link": "/planned-giving",
                    "displayName": "Planned Giving",
                    railsLink: false
                },{
                    "link": "/family-agreements",
                    "displayName": "Family Agreements Policy",
                    railsLink: false
                },{
                    "link": "/archives",
                    "displayName": "Archives",
                    railsLink: false
                },{
                    "link": "/committee-primer",
                    "displayName": "Committee Primer",
                    railsLink: false
                },{
                    "link": "/ICFC 2020 Yearbook.pdf",
                    "displayName": "Yearbook",
                    railsLink: false
                },
            ]
        },{
            "sectionName": "Resources",
            "links": [{
                    "link": "/articles",
                    "displayName": "Blog",
                    railsLink: true
                }, {
                    "link": "/events",
                    "displayName": "Events",
                    railsLink: true
                },{
                    "link": "/galleries",
                    "displayName": "Pictures",
                    railsLink: true
                },{
                    "link": "/users",
                    "displayName": "Directory",
                    railsLink: true
                },{
                    "link": "/cabins",
                    "displayName": "Cabins",
                    railsLink: true
                },{
                    "link": "/charts",
                    "displayName": "Charts",
                    railsLink: false
                },{
                    "link": "/rideshare",
                    "displayName": "Rideshare",
                    railsLink: false
                }
            ]
        }];

        const sideBarSections = [];
        sidebarLinks.forEach(section => {
            sideBarSections.push(
                <p>{section.sectionName}</p>
            );
        })

        const { 
            isAuthenticated, 
            isAdmin, 
            isLoading,
            inSeasonResLink,
            outSeasonResLink,
            showSidebar
        } = this.state;

        return (
            <React.Fragment>
                { isAuthenticated && !isLoading ? (
                        <AppContainer>
                            <Sidebar.Pushable as={Segment}>
                                <Sidebar
                                    as={Menu}
                                    className='sidebar'
                                    animation='overlay'
                                    icon='labeled'
                                    inverted
                                    vertical
                                    visible={showSidebar}
                                    width='thin'
                                >
                                    <h3>Reservations</h3>
                                    <Menu.Item className="sidebar-link" as='a' href={inSeasonResLink}>
                                        In-Season Reservations
                                    </Menu.Item>
                                    <Divider fitted />
                                    <Menu.Item className="sidebar-link" as='a' href={outSeasonResLink}>
                                        Out of Season Reservations
                                    </Menu.Item>
                                    <Divider fitted />
                                    {
                                        sidebarLinks.map((keyName, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <h3 key={i}>{keyName['sectionName']}</h3>
                                                    {
                                                        keyName['links'].map((keyName, i) => {
                                                            return keyName['railsLink'] === true ? (
                                                                <React.Fragment key={i}>
                                                                    <Menu.Item id={i} className="sidebar-link" as='a' href={keyName['link']}>
                                                                        {keyName['displayName']}
                                                                    </Menu.Item>
                                                                    <Divider fitted />
                                                                </React.Fragment>
                                                            ) : (
                                                                <React.Fragment key={i}>
                                                                    <Menu.Item id={i} className="sidebar-link">
                                                                        <Link to={keyName['link']}>{keyName['displayName']}</Link>
                                                                    </Menu.Item>
                                                                    <Divider fitted />
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </Sidebar>
                                <Sidebar.Pusher>
                                    <ContentContainer>
                                        <Routes 
                                            isAuthenticated={isAuthenticated}
                                            userId={this.props.userId}
                                            isAdmin={isAdmin}
                                        />
                                    </ContentContainer>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                            <Checkbox
                                label='Show Sidebar'
                                className='mobile-sidebar-checkbox'
                                checked={this.state.showSidebar}
                                onChange={e => this.setSidebarVisible(e)}
                            />
                        </AppContainer>
                    ) : (
                        <AppContainer centered>
                            <ContentContainer centered>
                                <Routes 
                                    isAuthenticated={isAuthenticated}
                                    userId={this.props.userId}
                                />
                            </ContentContainer>
                    </AppContainer>
                )}
            </React.Fragment>
        )
    }
}

export default App;