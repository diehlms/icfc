import React, { useEffect } from 'react';
import { Message } from 'semantic-ui-react'

export default function ErrorToast(props) {
    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <Message negative>
                <Message.Header>Oops!</Message.Header>
                <Message.List>
                    {
                        props.errors.map((error, i) => (
                            <Message.Item key={i}>{error}</Message.Item>
                        ))
                    }
                </Message.List>
            </Message>
        </React.Fragment>

    );
}