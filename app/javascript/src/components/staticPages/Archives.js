import React from 'react';
import { Tab } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Header from '../shared/PageTitle';

import styled from 'styled-components';


const RailsLink = styled.a`
`;

const panes = [
    {
        menuItem: 'Back Bay Bilges (1993-2013)',
        render: () => 
        <Tab.Pane>
            <ListGroup>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_1993.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2000.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2001.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2002.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2003.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2004.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2005.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2006.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2010.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2011.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2012.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2013.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2014.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2015.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2016.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2017.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2018.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/BBB_2019.pdf" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/backbaybilges/ICFC_Back_Bay_Bilge_2020.docx" target="_blank"></RailsLink></ListGroupItem>
            </ListGroup>
        </Tab.Pane>,
    },
    { 
        menuItem: 'Daily Bilges (2001 - 2021)', 
        render: () => 
        <Tab.Pane>
            <ListGroup>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2001.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2005.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2006.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2007.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2008.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2009.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2010.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2011.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2012.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2013.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2014.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2015.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2016.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2017.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2019.htm" target="_blank">Link</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/dailybilges/The_Daily_Bilge_2019.htm" target="_blank">Link</RailsLink></ListGroupItem>
            </ListGroup>
        </Tab.Pane> 
    },
]

class Index extends React.Component {
    state = {
    }

    render() {

        return (
            <div className="reactPageAppContainer">
                <Header 
                    size="h1"
                    text="Archives"
                />
                <Tab panes={panes}></Tab>
            </div>
        )
    }
}


export default Index;