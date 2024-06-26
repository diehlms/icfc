import React from 'react';
import { Header } from 'semantic-ui-react'

function PageTitle(props) {
    return (
        <React.Fragment>
            <Header
                textAlign={!!props.align ? props.align : 'left'} 
                as={props.size}
            >
                {props.text}
            </Header>
        </React.Fragment>
    );
}

export default PageTitle;