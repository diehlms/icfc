import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react'

export default function ErrorToast(props) {
    const { errors } = props;

    if (!!errors[1] && !!errors[1].errors) {
        console.log(errors[1])
    }

    return (
        <React.Fragment>
            {
                !!errors[1] && 
                !!errors[1].errors && 
                Array.isArray(errors[1].errors) ? (
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
        </React.Fragment>

    );
}