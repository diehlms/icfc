import React from 'react';
import Routes from './routes/Index';
import styled from 'styled-components';

// global styles
import './App.scss';
import Sidebar from './components/sidebar/Sidebar.tsx';

const PageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`;

class App extends React.Component {
    render() {
        return (
            <PageContainer>
                <Sidebar
                    unauthorized={!!this.props.user_id || this.props.user_id === null}  
                />
                <Routes 
                    user_id={this.props.user_id}
                />
            </PageContainer>
        )
    }
}

export default App;