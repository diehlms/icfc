import React from 'react'
import Title from "../../shared/Title"
import HorizontalLine from '../../shared/HorizontalLine'
import SubTitle from '../../shared/SubTitle'
import BodyText from '../../shared/BodyText'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    root: {
        borderRadius: 0,
        margin: '5px'
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: 0,
      width: '30%'
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },

    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 80
    },
    tableContainer: {
        margin: 12
    }
});

export default function PlannedGiving() {
    const classes = useStyles();

    return (
        <div className="containerMain">
            <Title
                text="Planned Giving"
            />
            <HorizontalLine />
            <BodyText text="Dear Iron Citiizens," />
            <BodyText text="Iron City holds a special place in the hearts and minds of all of us. The deep connection we feel for one another and the remarkable Georgian Bay landscape have created a unique combination that makes Iron City a “must” destination in members’ annual vacation planning. We hope you will take a moment to consider this request for your support." />
            <BodyText text="The cost of maintaining our club on an annual basis seems to rise at a rate faster than inflation, and many Iron Citizens have taken more active leadership roles in issues around the health and wellbeing of the Georgian Bay community. We are writing to ask you to consider investing in the future of our Club by supporting the Iron City Endowment Fund and/or the Iron City Charitable Gift Fund." />
            <SubTitle text="Endowment Fund" />
            <BodyText text="Beginning in 2011, we asked members to support a campaign to grow the value of the Endowment Fund, in part so that we would not have to raise funds from members on an ongoing basis as Club infrastructure required improvement. Many generous members immediately stepped up with both one-time gifts and multi-year pledges. Between the generosity of members and growth in the stock market, we were able to grow the value of the Endowment over $1 million in relatively short order. " />
            <BodyText text="At the same time, the Board approved a policy related to the Endowment Fund that would allow dividend and interest income to be used for capital projects at the Club without having to be repaid, subject to the fund maintaining a value of over $1 million (this base amount will shift over time to account for inflation). It was through this annual draw that we were able to rebuild the Reed Bridge, a project with an estimated cost of approximately $300,000, without taking a loan from the Endowment. Long-term, this draw helps alleviate some cost pressures on membership dues and outing fees, subject to us maintaining the minimum balance of $1 million+." />
            <SubTitle text="Charitable Gift Fund" />
            <BodyText text="In 2010, Clive and Nancy Runnells gave a very generous gift of $100,000 to create the Charitable Gift Fund (CGF). Over time, Clive and Nancy and many other members have contributed to the CGF, which has increased our ability to do more for the Georgian Bay and Parry Sound communities. " />
            <BodyText text="One of the most significant programs of the CGF has been to create a scholarship program for students at Parry Sound High School to help them be the first in their family to go on to post-secondary education. In addition, the CGF has also provided support to the Festival of the Sound, the West Parry Sound Health Centre, the Georgian Bay Biosphere Reserve, the Georgian Bay Land Trust and Georgian Bay Forever. " />
            <SubTitle text="How can you help?" />
            <BodyText text="Here are several ways in which you can help:" />
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Planned Giving: Please consider making a planned gift to the Endowment and/or Charitable
                                Gift Funds in your will. The two most common types of planned gifts are bequests and gifts
                                of life insurance.
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Annual Giving: Consider making an annual pledge to either or both Funds. During the initial Endowment campaign, several members pledged money over a two- to five-year time frame, which proved to be an effective way of spreading payments over time rather than giving a one-time lump sum.
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Rounding Up: When paying your annual membership dues and/or your outing fees for summer encampment, please consider adding a voluntary amount to the Endowment on your invoice. If you are not concerned about getting a charitable tax receipt, you can also choose to make a gift to the Charitable Gift Fund this way, too. (If a charitable tax receipt is important to you, you will need to donate directly to it through The Pittsburgh Foundation.)
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Giving the gift of Iron City: Are you challenged for gift ideas to commemorate birthdays, anniversaries, Christmas, etc.? Rather than buying a gift for these occasions, why not honor your loved ones by making a donation to one or both of the Funds, which will create a lasting legacy?
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <BodyText text="We sincerely hope that you will consider investing in the future of Iron City, so that it remains available for generations to come. If you require further information, please don’t hesitate to contact us or stop us on the boardwalk. Rah Rah Ray!!" />
            <BodyText text="Yours sincerely," />
            <BodyText text="Bruce Lawson" />
            <BodyText text="Chair, Endowment Fundraising Committee Chair, Charitable Gift Fund" />
            <BodyText text="Bruce Lawson" />
            <BodyText text="Chair, Iron City Charitable Gift Fund" />
        </div>
    )
}
