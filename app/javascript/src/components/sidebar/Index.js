import React, { useEffect, useState } from 'react';

import '../../App.scss';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Menu, Segment, Sidebar, Divider, Button } from 'semantic-ui-react';
import * as axios from 'axios';


const AppContainer = styled.div`
    'margin: 0px auto;'
`;

export default function App(props) {
    const [reservationLinks, setReservationLinks] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const token = document.querySelector('meta[name="csrf-token"]').content;

    const initPage = () => {
        axios.get('/api/v1/entry/initial_payload')
        .then(res => {
            setReservationLinks({
                inSeasonResLink: res.data.inseason_reservation_link,
                outSeasonResLink: res.data.outseason_reservation_link
            })
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        initPage();
        setIsLoading(false);
    }, []);


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
                "link": "/2022yearbook.pdf",
                "displayName": "Yearbook",
                railsLink: true
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
            },
            {
                "link": "/committees",
                "displayName": "Committees",
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


    return (
        <AppContainer>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    className='sidebar'
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible={props.showSidebar}
                    width='thin'
                >
                    <Button color='yellow' size="medium" target="_blank" as='a' href="https://www.paypal.com/ncp/payment/95N2K7CA3CPF4">
                        Payments
                    </Button>
                    <h3>Reservations</h3>
                    <Menu.Item className="sidebar-link" target="_blank" as='a' href={reservationLinks.inSeasonResLink}>
                        In-Season Reservations
                    </Menu.Item>
                    <Divider fitted />
                    <Menu.Item className="sidebar-link" target="_blank" as='a' href={reservationLinks.outSeasonResLink}>
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
                    {props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </AppContainer>
    )
}