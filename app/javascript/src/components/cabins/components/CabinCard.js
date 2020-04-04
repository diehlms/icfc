import React from 'react'
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom";

function CabinHeader(props) {
    return (
        <div>
            <Typography variant="h3">
                <Link to={`/cabins/${props.id}`}>{props.name}</Link>
            </Typography>
        </div>
    )
}

function CabinBody(props) {
    return (
        <Typography variant="p">
            <Link to={`/cabins/${props.id}`}>Check Availability</Link>
        </Typography>
    )
}

export default function CabinCard(props) {
    return (
        <div style={{
            border: "1px solid red",
            padding: "15px",
            borderRadius: "2px",
            margin: "5px"
        }}>
            <CabinHeader 
                id={props.id}
                name={props.name}
            />
            <CabinBody 
                bedrooms={props.bedrooms}
            />
        </div>
    )
}