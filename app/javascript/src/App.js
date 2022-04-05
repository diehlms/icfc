import React from 'react';
import Routes from './routes/Index';

import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Menu, Segment, Sidebar, Divider } from 'semantic-ui-react';

const AppContainer = styled.div`
    ${props => props.centered ? 'margin: 0px auto;' : ''}
`;

const ContentContainer = styled.div`
    ${props => props.centered ? 'margin: 0px auto;' : 'margin-left: 22%;'}
    padding: ${props => props.centered ? '0px' : '33px'};
    width: 75%;
`;

class App extends React.Component {
    state = { 
        activeIndex: 0,
        isAuthenticated: false
    }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }

    componentDidMount = () => {
        const initialPayload = this.props;
        if (!!initialPayload.user_id && initialPayload.user_id !== null) {
            this.isAuthenticated = true;
            this.setState({
                isAuthenticated: true
            })
        }
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
                    "link": "/",
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

        const { isAuthenticated } = this.state;

        return (
            <React.Fragment>
                { isAuthenticated ? (
                    <AppContainer>
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                as={Menu}
                                className='sidebar'
                                animation='overlay'
                                icon='labeled'
                                inverted
                                vertical
                                visible={this.state.isAuthenticated}
                                width='thin'
                            >
                                {
                                    sidebarLinks.map((keyName, i) => {
                                        return (
                                            <React.Fragment>
                                                <h3 id={i}>{keyName['sectionName']}</h3>
                                                {
                                                    keyName['links'].map((keyName, i) => {
                                                        return keyName['railsLink'] === true ? (
                                                            <React.Fragment>
                                                                <Menu.Item id={i} className="sidebar-link" as='a' href={keyName['link']}>
                                                                    {keyName['displayName']}
                                                                </Menu.Item>
                                                                <Divider fitted />
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
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
                                        user_id={this.props.user_id}
                                    />
                                </ContentContainer>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </AppContainer>
                ) : (
                    <AppContainer centered>
                        <ContentContainer centered>
                            <Routes 
                                isAuthenticated={isAuthenticated}
                                user_id={this.props.user_id}
                            />
                        </ContentContainer>
                </AppContainer>
                )}
            </React.Fragment>
        )
    }
}

export default App;