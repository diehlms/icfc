import React, { Component } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../shared/PageTitle';
import { Table, Form, Dropdown, Input } from 'semantic-ui-react'

const options = [
    { key: 'torontoAirport', text: 'Toronto Airport', value: 'torontoAirport' },
    { key: 'buffaloAirport', text: 'Buffalo Airport', value: 'buffaloAirport' },
    { key: 'pittsburgh', text: 'Pittsburgh', value: 'pittsburgh' },
]

export class Index extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value });

    render() {
        return (
            <div className="reactPageAppContainer">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Rideshare</Breadcrumb.Item>
                </Breadcrumb>
                <Header 
                    size="h1"
                    text="Rideshares"
                />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            width='7'
                            type='number' 
                            fluid 
                            label='Number of Passengers' 
                            placeholder='0' 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Dropdown
                                text='From'
                                floating
                                selection
                                className='inputSelect'
                            >
                            <Dropdown.Menu>
                                <Dropdown.Header content='Search Issues' />
                                <Input icon='search' iconPosition='left' name='search' />
                                <Dropdown.Header icon='tags' content='Filter by tag' />
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    text='Important'
                                />
                                <Dropdown.Item
                                    text='Announcement'
                                />
                                <Dropdown.Item
                                    text='Discussion'
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown
                            text='To'
                            floating
                            selection
                            className='inputSelect'
                        >
                            <Dropdown.Menu>
                                <Dropdown.Header content='Search Issues' />
                                <Input icon='search' iconPosition='left' name='search' />
                                <Dropdown.Header icon='tags' content='Filter by tag' />
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    text='Important'
                                />
                                <Dropdown.Item
                                    text='Announcement'
                                />
                                <Dropdown.Item
                                    text='Discussion'
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.TextArea label='Additional Information' placeholder='What else should people know about your trip...' />
                    <Form.Button>Submit</Form.Button>
                </Form>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Point of Departure</Table.HeaderCell>
                        <Table.HeaderCell>Point of Arrival</Table.HeaderCell>
                        <Table.HeaderCell>Number of Seats Available</Table.HeaderCell>
                        <Table.HeaderCell>Leaving at</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Edit</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default Index;