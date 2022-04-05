import React, { Component } from 'react'
import { Breadcrumb, Table, FormControl, FormGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import * as axios from 'axios';

const CardWrapper = styled.div`
`;

const ChartForm = styled.div`
    margin: 0 auto;
    padding: 0px 33%;
`;

const ChartTable = styled.div`
    margin-top: 12px;
`;

const Validator = styled.span`
    text-size: 8px;
    margin: 7px;
`;

function ChartList(props) {
    const fileName = url => {
        return url.split('/').slice(-1)[0];
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const deleteChart = (e, id) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/api/v1/charts/destroy/${id}`,
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(() => {
            props.getCharts();
        })
        .catch(err => {
            console.log(err);
        });
    }
    let chartList;
    if (props.props.charts) {
        chartList = props.props.charts.map(chart =>
            <tr key={chart.id}>
                <td>{chart.caption} {
                    props.props.sessionId === chart.user_id ? (
                        <button onClick={e => deleteChart(e, chart.id)}>delete</button>
                    ) : null
                }</td>
                <td>{moment(chart.created_at).format("DD/MM/YYYY, h:mm a")}</td>
                <td><a href={`${chart.chart.url}`}>{fileName(chart.chart.url)}</a></td>
            </tr>
        );
    };
    return (
        <CardWrapper>
            { props.isLoading || ( props.charts && props.charts.length === 0 ) ? (
                <p>No charts added yet</p>
            ) : (
                <ChartTable>
                    <Table condensed="true" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Posted At</th>
                                <th>Download Link (right click, click 'save as')</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartList}
                        </tbody>
                    </Table>
                </ChartTable>
            )}
        </CardWrapper>
    );
}

class Form extends Component {
    state = {
        sessionId: null,
        caption: "",
        chart: null,
        uploading: false,
        errorMessage: null
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    chartUpload = e => {
        this.setState({chart: e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            uploading: true
        });
        const token = document.querySelector('meta[name="csrf-token"]').content;
        let body = new FormData();
        body.append('chart', this.state.chart);
        body.append('caption', this.state.caption);
        body.append('user_id', this.props.user_id);
        fetch('/api/v1/charts', {
            method: "POST",
            headers: {
                "X-CSRF-Token": token
            },
            body: body
        })
        .then(res => {
            this.setState({uploading: false});
            if (res.ok) {
                return res.json();
            } else {
                this.setState({errorMessage: 'Failed to post'});
            }
        })
        .then(() => {
            this.props.getCharts();
        });
    }

    render() {
        return (
            <ChartForm>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            name="caption"
                            placeholder="caption"
                            onChange={this.onChange}
                        />
                        <Validator>Accepted file extensions: .gpx, .shp, .zip</Validator>
                        <FormControl
                            type="file"
                            onChange={this.chartUpload}
                        />
                    </FormGroup>
                    <button variant="text" type="submit">
                        Submit
                    </button>
                </form>
            </ChartForm>
        )
    }
}

export class Index extends Component {
    state = {
        isLoading: false,
        charts: [],
        errorMessage: null,
        sessionId: null
    }

    componentDidMount() {
        this.getCharts();
    }

    getCharts() {
        this.setState({
            isLoading: true,
            sessionId: this.props.user_id
        });
        axios.get('/api/v1/charts')
        .then(res => {
            this.setState({
                charts: res.data,
                isLoading: false
            });
        })
        .catch(err => {
            this.setState({
                errorMessage: "We're having trouble finding charts for your request. Please try again later",
                isLoading: false
            });
        });
    }

    render() {
        return (
            <div className="reactPageAppContainer">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Charts</Breadcrumb.Item>
                </Breadcrumb>
                {/* <h1>Family Trees</h1>
                <p>Please find the link to the shared google drive below. Feel free to share your family's tree there using templates provided by Sophia Crawford.</p>
                <Button><Link href="https://drive.google.com/drive/folders/10dEUl82hW_-4PH_enwEUKngWz3HAjzys">Family Trees</Link></Button> */}
                <h1>Charts</h1>
                <Form 
                    user_id={this.state.sessionId}
                    getCharts={this.getCharts.bind(this)}
                >    
                </Form>
                {
                    this.state.loading ? (
                        <BarLoader />
                    ) : (
                        <ChartList
                            getCharts={this.getCharts.bind(this)}
                            props={this.state} 
                        />
                    )
                }
            </div>
        )
    }
}

export default Index;