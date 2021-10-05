import React, { Component } from 'react'
import styled from 'styled-components';
import DataService from '../../helpers/data.service';
import CircleLoader from 'react-spinners/CircleLoader'
import { withRouter } from 'react-router-dom';

const PageContainer = styled.div`
    padding: 20px;
`;

const Row = styled.div`
    display: flex;
`;

const Col = styled.div`
    flex: ${(props) => props.size};
    padding: 12px;
`;

const HomepageCard = styled.div`
    border: 1px solid red;
    height: 33vh;
    width: 37vw;
    padding: 15px;
`;

const IFrameWrapper = styled.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`;

const dataService = new DataService();

export class Index extends Component {
    state = {
        isLoading: false,
        data: [],
        errorMessage: null,
    }

    componentDidMount() {
        this.setState({isLoading: true});
        dataService.getData('articles').then(res => {
            this.setState({...this.state, 
                data: {
                    articles: res.data
                },
                errorMessage: res.errorMessage,
                isLoading: false
            });
        });
    }

    clickSignIn(e) {
        e.preventDefault();
        document.querySelector('#login-btn').click();
    }

    clickSignUp(e) {
        e.preventDefault();
        this.props.history.push('/users/new');
    };

    render() {
        return (
            <React.Fragment>
                {this.props.user_id === null ? (
                    <PageContainer>
                        <h1>Looks like you're not logged in.</h1>
                        <button onClick={e => this.clickSignIn(e)}>Sign In</button>
                        <button onClick={e => this.clickSignUp(e)}>Sign Up</button>
                    </PageContainer>
                ) : (
                    <React.Fragment>
                        {this.state.isLoading ? (
                            <PageContainer>
                                <CircleLoader />
                            </PageContainer>
                            ) : (
                            <PageContainer>
                                <Row>
                                    <Col size={2}>
                                        <HomepageCard>Recent Updates
                                            <div>
                                            {
                                                this.state.data.articles? (
                                                    <ul>
                                                        {this.state.data.articles.map(article => (
                                                            <li key={article.id}>
                                                                {article.title}
                                                            </li>   
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>No articles yet.</span>
                                                )
                                            }
                                            </div>
                                        </HomepageCard>
                                    </Col>
                                    <Col size={2}>
                                        <HomepageCard>What's Happening Today</HomepageCard>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={2}>
                                        <HomepageCard>
                                            <IFrameWrapper 
                                                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1459440.1988828832!2d-80.56660371920148!3d44.403018062644065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x882b394ac02dd491%3A0xb41d5de9c4030ec5!2sToronto%20Pearson%20International%20Airport%2C%20Silver%20Dart%20Drive%2C%20Mississauga%2C%20ON%2C%20Canada!3m2!1d43.6777176!2d-79.6248197!4m5!1s0x4d2af89d9f168371%3A0xf170c239ee53f14c!2sMacTier%2C%20ON%2C%20Canada!3m2!1d45.139272999999996!2d-79.771827!5e0!3m2!1sen!2sus!4v1572568118601!5m2!1sen!2sus">
                                            </IFrameWrapper>
                                        </HomepageCard>
                                    </Col>
                                    <Col size={2}>
                                        <HomepageCard>card4</HomepageCard>
                                    </Col>
                                </Row>
                            </PageContainer>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default Index;