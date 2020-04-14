import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'block',
        fontSize: 12,
        color: 'darkGrey'
    },
});

export default function HashLink(props) {
    const classes = useStyles();

    return (
        <Link className={classes.root} to={`${props.pageSection}`}>{`${props.pageName}`}</Link>
    )
}
