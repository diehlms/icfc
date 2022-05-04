import React, { useEffect, useState } from 'react';
import Routes from './routes/Index';
import Sidebar from './components/sidebar/Index';
import ErrorToast from './components/shared/ErrorToast';
import Loading from './components/shared/Loading';

import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import { useSelector } from 'react-redux'

import { Checkbox } from 'semantic-ui-react';


const AppContainer = styled.div`
    margin: 0px auto;
`;

const ContentContainer = styled.div`
    @media only screen and (max-width: 700px) { 
        margin-left: 10%;
    }
    ${props => props.centered ? 'margin: 0px auto;' : 'margin-left: 22%;'}
    padding: ${props => props.centered ? '0px' : '33px'};
    width: 75%;
`;

export default function App(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const initialPayload = props;
        if (!!initialPayload.userId && initialPayload.userId !== null) {
            setIsAuthenticated(true);
            setUserId(initialPayload.userId)
            setIsAdmin(initialPayload.isAdmin);
        }
    }, []);

    const setSidebarVisible = (e) => {
        e.preventDefault();
        setShowSidebar(!showSidebar);
    }

    const errors = useSelector((state) => state.errors);
    const loading = useSelector((state) => state.loading);

    return (
        <React.Fragment>
            { isAuthenticated ? (
                    <AppContainer>
                        <Sidebar
                            setSidebarVisible={setSidebarVisible}
                            showSidebar={showSidebar}
                            isAdmin={props.isAdmin}
                        >
                            <ContentContainer>
                                {
                                    !!loading && loading.loading === true ? (
                                        <Loading />
                                    ) : (
                                        <React.Fragment>
                                            <ErrorToast 
                                                errors={errors}
                                            />
                                            <Routes 
                                                isAuthenticated={isAuthenticated}
                                                userId={props.userId}
                                                isAdmin={isAdmin}
                                            />
                                        </React.Fragment>
                                    )
                                }
                            </ContentContainer>
                        </Sidebar>
                        <Checkbox
                            label='Show Sidebar'
                            className='mobile-sidebar-checkbox'
                            checked={showSidebar}
                            onChange={e => setSidebarVisible(e)}
                        />
                    </AppContainer>
                ) : (
                    <AppContainer centered>
                        <ContentContainer centered>
                            <Routes
                                isAdmin={isAdmin} 
                                isAuthenticated={isAuthenticated}
                                userId={userId}
                            />
                        </ContentContainer>
                </AppContainer>
            )}
        </React.Fragment>
    )
}