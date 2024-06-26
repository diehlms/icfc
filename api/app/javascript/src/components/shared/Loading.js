import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    min-height: 100vh;
`;

export default function Loading(props) {
    return (
        <LoadingContainer>
            <Dimmer active inverted>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
        </LoadingContainer>
    );
}