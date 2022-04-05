import React from 'react';
import Title from '../shared/PageTitle';
import { Tab } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Container, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';
const RailsLink = styled.a`
`;

const panes = [
    {
        menuItem: 'Miscellaneous',
        render: () => 
        <Tab.Pane>
            <ListGroup>
                <ListGroupItem><RailsLink href="/2019_LeaderTeam_Application.pdf" target="_blank">Leadership Team Application</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2019_LeaderTeamApplicationInformation.pdf" target="_blank">Leadership Team Information</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2020_Application for Wait Staff.doc" target="_blank">Wait Staff Application</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2020_Application Information for Wait Staff.doc" target="_blank">Wait Staff Information</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2020 Wait Staff Regulations.pdf" target="_blank">Wait Staff Regulations</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2020_Emergency Medical Form for Wait Staff.doc" target="_blank">Emergency Medical Form for Wait Staff</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/2015_SpecialDietaryRequestForm.pdf" target="_blank">Dietary Request Forms</RailsLink></ListGroupItem>
                <ListGroupItem><RailsLink href="/WorkOrder.pdf" target="_blank">Work Order Forms</RailsLink></ListGroupItem>
            </ListGroup>
        </Tab.Pane>
    }
]
class Index extends React.Component {
    state = {
    }


    render() {

        return (
            <div className="reactPageAppContainer">
                <Title 
                    size="h1"
                    text="Forms"
                />
                <Tab panes={panes} />
            </div>
        )
    }
}


export default Index;
