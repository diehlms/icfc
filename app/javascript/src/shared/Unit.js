import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'inline-block'
    }
});

export default function Unit(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        </div>
    )
}