import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Title(props) {
    return (
        <Typography variant="h2">
            {props.text}
        </Typography>
    )
}
