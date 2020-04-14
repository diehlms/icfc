import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: "5px 0px 2px 0px",
        fontSize: 14,
        width: '100%'
    },
    text: {
        fontSize: 14
    }
});

export default function BodyText(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.text} variant="body1">
                {props.text}
            </Typography>
        </div>
    )
}