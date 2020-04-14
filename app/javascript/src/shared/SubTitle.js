import React from 'react';
import Typography from '@material-ui/core/Typography'

export default function SubTitle(props) {
    return (
        <Typography id={props.id} variant="h4">
            {props.text}
        </Typography>
    )
}
