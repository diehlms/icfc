import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        minHeight: '50vh'
    },
    container: {
        maxHeight: 440,
    },
});

function DateTable(props) {
    const classes = useStyles();
    const rows = props.dates

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell align="right">To</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={`${row.startdate}_${row.enddate}`}>
                        <TableCell>{row.startdate}</TableCell>
                        <TableCell align="right">{row.enddate}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DateTable;
