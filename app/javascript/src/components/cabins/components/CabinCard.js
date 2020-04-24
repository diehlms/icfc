import React from 'react'
import Typography from "@material-ui/core/Typography"
import SubTitle from '../../../shared/SubTitle'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import IconButton from '@material-ui/core/IconButton';

function CabinHeader(props) {
    return (
        <Typography variant="h3">
            <Link to={`/cabins/${props.id}`}>{props.name}</Link>
        </Typography>
    )
}

function CabinBody(props) {
    return (
        <Typography color={props.color}>
            <Link to={`/cabins/${props.id}`}>Check Availability</Link>
        </Typography>
    )
}

const useStyles = makeStyles({
    root: {
      minWidth: 235,
      margin: '5px 10px'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

export default function CabinCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <CabinHeader
                    className={classes.title} 
                    id={props.id}
                    name={props.name}
                />
            </CardContent>
            <CardActions>
                <Button size="small">
                    <CabinBody
                        id={props.id}
                        color="textSecondary"
                        className={classes.title} 
                        bedrooms={props.bedrooms}
                    />
                </Button>
                <IconButton>
                    <Typography>
                        {props.bedrooms}
                    </Typography>
                    <SingleBedIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}