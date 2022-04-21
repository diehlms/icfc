import React, { useEffect, useState } from 'react';
import { Tab, Divider, Grid } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Header from '../shared/PageTitle';
import DocumentUpload from '../shared/DocumentUpload';

import * as axios from 'axios';

import styled from 'styled-components';

const RailsLink = styled.a`
`;

export default function Index(props) {
    const [backBayBilges, setBackBayBilges] = useState([]);
    const [dailyBilges, setDailyBilges] = useState([]);
    const [error, setError] = useState('');

    const panes = [
        {
            menuItem: 'Back Bay Bilges (1993-2013)',
            render: () => 
                <Tab.Pane>
                    <ListGroup>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_1993.pdf" target="_blank">1993</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2000.htm" target="_blank">2000</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2001.htm" target="_blank">2001</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2002.htm" target="_blank">2002</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2003.htm" target="_blank">2003</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2004.htm" target="_blank">2004</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2005.htm" target="_blank">2005</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2006.htm" target="_blank">2006</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2010.htm" target="_blank">2010</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2011.htm" target="_blank">2011</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2012.pdf" target="_blank">2012</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2013.pdf" target="_blank">2013</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2014.pdf" target="_blank">2014</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2015.pdf" target="_blank">2015</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2016.pdf" target="_blank">2016</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2017.pdf" target="_blank">2017</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2018.pdf" target="_blank">2018</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/BBB_2019.pdf" target="_blank">2019</RailsLink></ListGroupItem>
                        <ListGroupItem><RailsLink href="/backbaybilges/ICFC_Back_Bay_Bilge_2020.docx" target="_blank">2020</RailsLink></ListGroupItem>
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
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2001.htm" target="_blank">2001</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2005.htm" target="_blank">2005</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2006.htm" target="_blank">2006</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2007.htm" target="_blank">2007</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2008.htm" target="_blank">2008</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2009.htm" target="_blank">2009</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2010.htm" target="_blank">2010</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2011.htm" target="_blank">2011</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2012.htm" target="_blank">2012</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2013.htm" target="_blank">2013</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2014.htm" target="_blank">2014</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2015.htm" target="_blank">2015</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2016.htm" target="_blank">2016</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2017.htm" target="_blank">2017</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2018.htm" target="_blank">2018</RailsLink></ListGroupItem>
                    <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2019.htm" target="_blank">2019</RailsLink></ListGroupItem>
                    {
                            !!dailyBilges && dailyBilges.length > 0 ? (
                                <React.Fragment>
                                    {
                                        dailyBilges.map((backBayBilge, i) => (
                                            <ListGroupItem
                                                key={i}
                                            >
                                                <RailsLink 
                                                    href={backBayBilge.document.url} 
                                                    target="_blank">
                                                        {backBayBilge.document_title}
                                                </RailsLink>
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
            axios.get(`/api/v1/documents/index/${archive}`)
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
