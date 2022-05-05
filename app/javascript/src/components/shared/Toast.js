import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react'

export default function ErrorToast(props) {
    const [messageType, setMessageType] = useState(null);

    const { errors, successMessages } = props;

    useEffect(() => {
        if (!!errors && !!errors[1] && !!errors[1].errors) {
            setMessageType('errors');
        }
    
        if (!!successMessages && !!successMessages[1] && !!successMessages[1].successMessages) {
            console.log(successMessages[1].successMessages)
            setMessageType('successMessages');
        }
    })

    return (
        <React.Fragment>
            {
                !!messageType && 
                messageType === 'errors' &&
                Array.isArray(errors[1].errors) ? 
                (
                    <Message negative>
                        <Message.Header>Oops!</Message.Header>
                        <Message.List>
                            {
                                errors[1].errors.map((error, i) => (
                                    <Message.Item key={i}>{error}</Message.Item>
                                ))
                            }
                        </Message.List>
                    </Message>
                ) : (
                    <React.Fragment />
                )
            }
            {
                !!messageType && 
                messageType === 'successMessages' &&
                !!successMessages[1].successMessages ?
                (
                    <Message success>
                        <Message.Header>
                            <Message.Item>{successMessages[1].successMessages}</Message.Item>
                        </Message.Header>
                    </Message>
                ) : (
                    <React.Fragment />
                )
            }
        </React.Fragment>
    );
}