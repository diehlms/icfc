import React from 'react';
import Title from '../shared/PageTitle';
import { Container, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

class Index extends React.Component {
    state = {
    }

    render() {

        return (
            <div className="reactPageAppContainer">
                <Title
                    size="h1"
                    text="Membership"
                />
                <Container text>
                    <p>The process for becoming a member of Iron City Fishing Club has historically been fairly informal. The Membership/Guest Committee has reviewed this process and has adopted the following guidelines after discussion at the Annual Membership meeting of the Club this Fall.</p>
                    <h4>MEMBERSHIP/GUEST COMMITTEE</h4>
                    <p>The Membership/Guest Committee is a Standing Committee authorized by the By-Laws of Iron City Fishing Club to review and recommend to the Membership candidates for membership properly proposed and recommended by individual members.</p>
                    <h4>MEMBERSHIP SECRETARY</h4>
                    <p>The Membership Secretary is an elected officer of the Club who works in concert with the Membership/Guest Committee. Typically the Secretary also serves on the Committee. Proposal letters and recommendation letters should be submitted to the Secretary with a copy to the Chair of the Membership/Guest Committee. The Membership Secretary coordinates communication and proxy ballots with the membership for membership/guest issues.</p>
                    <h4>MEMBERSHIP</h4>
                    <p>The Membership of the Club has reserved in the By-Laws the right to vote on candidates for membership. A candidate must be voted upon favorably by 75% of the members voting in order to be admitted to membership.</p>
                    <h4>OVERVIEW</h4>
                    <p>The Membership/Guest Committee proposed and the Members agreed it was desirable to clarify and strengthen the membership application process. The intent of the process is to ensure a candidate has overwhelming support of the Membership before a candidate is submitted to the Membership for a vote. If the Committee does not believe there would be overwhelming support, it would work with the proposer to determine what steps are necessary to generate such support.</p>
                    <p>A primary change is that candidates for membership would only be voted upon by the Membership at the Annual Meeting in the fall. Prior to that meeting a timetable would be in place to give the process sufficient time to work. There is no practical advantage for a candidate to be voted upon at the semi annual meeting in the summer. Both the dues and the outing charges are based upon a calendar year rather than when the vote is taken.</p>
                    <p>Additional review points have been established in an effort to identify issues as early as possible that would cause a candidate's proposal for membership to be deferred. This includes a formal posting process during the summer so that input would be available to the Membership/Guest Committee from all members as opposed to just a limited group. </p>
                    <div class="section-title">Process and Timeline:</div>
                    <h4>2/15 - INITIAL ACTION</h4>
                    <p>A member proposes a candidate for membership to the Membership Secretary who refers the proposal to the Membership/Guest Committee Chair. At this time a letter is required from the proposer and two letters of recommendation from other members who preferably are not family members. The Membership/Guest Committee has the right to require only one letter of recommendation for a child or grandchild of an existing member.</p>
                    <h4>3/7 - SPRING BOARD MEETING</h4>
                    <p>The Membership/Guest Chair presents the names of the proposed candidates to the Membership/Guest Committee and the Board of Directors no later than the Spring Board Meeting. During the time period between March and June members of the Committee and the Board will be asked to share comments, if any, with the Membership/Guest Chair or other members of the Membership/Guest Committee.</p>
                    <h4>6/15 - PRELIMINARY APPROVAL</h4>
                    <p>The Membership/Guest Committee decides whether the name of a candidate should be posted during the summer encampment. Members are asked to provide comments to the Membership/Guest Committee privately. A list of the candidates will be included in communications to the Club Membership and will be posted on the Dining Hall bulletin board during the Encampment.</p>
                    <h4>8/31 - END OF ENCAMPMENT</h4>
                    <p>The Membership/Guest Committee makes a decision whether or not a candidate is ready to be formally considered for membership. If positive, the proposer is notified by the Membership Secretary that the Membership/Guest Committee will entertain a formal application for membership by the proposer and candidate. </p>
                    <h4>9/15 - FALL MAILING</h4>
                    <p>Formal Applications are due to the Membership Secretary. Subsequently the Membership Secretary will notify the Membership of the names of the candidates for membership to be voted upon at the Annual Meeting, and will include an absentee ballot for those members who do not plan to be present at that meeting.</p>
                    <h4>11/7 - ANNUAL MEMBERSHIP MEETING</h4>
                    <p>The Membership at the Annual Meeting votes on the recommendation by the Membership/Guest Committee.</p>
                    <div class="section-title">Other Procedures</div>
                    <p>If at any time in the process the Membership/Guest Committee determines a candidate is not ready to be voted upon by the Membership, the proposer would be so informed. It would be the responsibility of the proposer to inform the candidate and to work with the Membership/Guest Committee to overcome whatever issues have arisen.</p>
                    <p>Factors to be Considered in Evaluating a Candidate for Membership:</p>
                    <ul>
                        <li>Historical participation in ICFC.</li>
                        <li>Love of ICFC.</li>
                        <li>Respect and appreciation of ICFC traditions.</li>
                        <li>Breadth of acquaintances among existing members.</li>
                        <li>Willingness to contribute / participate in ICFC.</li>
                        <li>Participation in ICFC during the regular encampment.</li>
                        <li>Attendance during 3 of the past 6 seasons.</li>
                        <li>Number of Camper days during the past few seasons.</li>
                        <li>Consistency of participation.</li>
                    </ul>
                    <p>None of these factors are rigid. The objective in having them is to determine if a candidate is well known to the membership currently, and if the candidate can demonstrate some level of commitment to the Club over a reasonable time.</p>
                    <div class="section-title">Roberts Rules of Order</div>
                    <p>The Membership/Guest Committee along with all other committees of the Club is required to comply with Roberts Rules of Order. Because the members of the Committee are geographically disbursed, Roberts Rules suggest a majority of the Committee is necessary to adopt a motion as opposed to a majority of those members present at a meeting. A written report of the majority decision in the form of a recommendation is required to be submitted to the Membership of the Club for approval and vote.</p>
                    <p>Although it is the intent of this process to build in sufficient time for the Membership/Guest Committee to make a decision about a recommendation to the Membership well before the Annual Meeting, Roberts Rules is very clear about preserving the right and obligation of a Committee</p> 
                    <ol>
                        <li>to present a minority (or contrary) opinion to the Membership when appropriate, and</li>
                        <li>to Reconsider (to possibly change) a committee vote or recommendation right up until the time the Membership makes its vote. The reason obviously is to ensure all information is considered even if it is available only at the last minute.</li>
                    </ol>
                </Container>
            </div>
        )
    }
}


export default Index;
