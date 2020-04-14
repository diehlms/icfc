import Input from '@material-ui/core/Input';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
    root: {
        borderRadius: 3,
        borderRight: '1px solid lightgrey',
        borderLeft: '1px solid lightgrey',
        borderTop: '1px solid lightgrey',
        borderBottom: '2px solid darkgrey',
        padding: 5,
        marginTop: 6,
        marginBottom: 5,
    }
});

export default function StyledInput(props) {
    const classes = useStyles();

    return (
        <Input
            disableUnderline="true"
            placeholder={props.placeholder}
            className={classes.root}
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            startAdornment={<InputAdornment position="start">{props.startAdornment}</InputAdornment>}
        />
    )
}
