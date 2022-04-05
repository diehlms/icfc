import React from 'react';
import Title from '../shared/PageTitle';
import { Container, Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

class Index extends React.Component {
    state = {
    }

    render() {

        return (
            <div>
                <Title
                    size="h1"
                    text="Committee Primer FAQ"
                />
                <Container text>
                    <Header as="h4">How does a person get selected for a committee?</Header>
                    <ul>
                        <li>As stated in the By-Laws, the President appoints all committees and designates chairmen thereof, and serves as an Ex-officio Member of each committee. However, he/she usually ask the chairs to draw up lists of members for his/her approval.</li>
                        <li>Committee Chairs invite members who have an interest, knowledge, talent, skills or expertise to serve on their committee.</li>
                        <li>Members may volunteer to participate on a committee.</li>
                        <li>The President or other members may suggest certain individuals for committee assignment.</li>
                        <li>Committee Chairs may seek diversity of representation (family, age, experience, gender, geography, etc.)</li>
                    </ul>
                    <Header as="h4">How often do committees meet?</Header>
                    <ul>
                        <li>Meeting need and frequency is determined by the Committee Chair.</li>
                        <li>Meetings may be called by the committee chair or requested by members. All committee members have the ability to influence committee agendas and results.</li>
                        <li>The fact that Committee Members are not in camp at the same time and people are geographically dispersed presents challenges for normal or regular committee operations. Committees need to be creative and flexible. The most effective committees engage in regular and timely communication with all committee members.</li>
                    </ul>
                    <Header as="h4">It seems like committee membership doesn’t change.</Header>
                    <ul>
                        <li>Members are free to serve on committees for extended periods based on personal interest. Committee Chairs are encouraged to include new committee members to invite fresh perspectives.</li>
                    </ul>
                    <Header as="h4">Is there an average size of membership or maximum number for committees?</Header>
                    <ul>
                        <li>There is no formula. Committees number from 4 to 16 members.</li>
                    </ul>
                    <Header as="h4">What if my name appears on a committee and I don’t have an interest in that committee?</Header>
                    <ul>
                        <li>Representation is voluntary. There is no requirement to serve on a committee. You may choose at any time to terminate or change committee affiliation.</li>
                    </ul>
                    <Header as="h4">I never hear from the chairperson. We rarely have meetings. I don’t know what’s going on. </Header>
                    <ul>
                        <li>Collaborate with the Committee Chair to revisit the overall purpose, strategies and short and long term objectives of the committee. Express your concerns and offer support. Perhaps there are ways you and others can help the Chair with the committee process.</li>
                    </ul>
                    <Header as="h4">Are there term limits for committee chairs?</Header>
                    <ul>
                        <li>No. Each President appoints or sanctions Committee Chairs and contributes ideas for committee representation.</li>
                    </ul>
                    <Header as="h4">How are committees are held accountable for their contributions?</Header>
                    <ul>
                        <li>In collaboration with the Committee Chairs the President addresses objectives, accountabilities and performance standards.</li>
                        <li>Committee members determine strategies, accountabilities, and deliverables</li>
                    </ul>
                    <Header as="h4">What is the interface between the BOD and committees?</Header>
                    <ul>
                        <li>To quote the Yearbook: Committees generally work with and through the Club staff. They establish programs, policies and procedures in their respective areas and advise the President and the Business Manager. Committee chairpersons should convene their committees in advance of encampment and several times during the season, where possible. Member suggestions and/or complaints should be addressed to the appropriate committee chairperson.</li>
                        <li>Committee Chairs prepare information, reports, and minutes for the BOD.</li>
                        <li>The BOD may provide strategic direction for committees.</li>
                    </ul>
                </Container>
                <Container text>
                    <Header as="h4">Article VI - Committees</Header>
                    <strong>Section 1 – Appointment of Committee Members</strong>
                    <p>The President shall appoint all committee members and committee Chairpersons, with the exception of the Executive Committee, which may be appointed by the Board. Committee titles and responsibilities shall be established from time to time as authorized at a meeting of the Members or at a meeting of the Board of Directors.</p>
                    <strong>Section 2 – Standing Committees</strong>
                    <p>There shall be standing Committees responsible for the areas of : Archives; Commissary; Communications; Entertainment; Environment and Education; Finance; Government and Community; Health; House; Human Resources; Insurance and Legal; Landscape and Litter; Library; Lodge; Membership and Guest; Newsletter; Nominating; Property; Recreation; Sunday Devotional; and Yearbook.</p>
                    <strong>Section 3 – Committee Meetings</strong>
                    <p>Every committee shall meet at least once during the year at the call of its Chairperson and submit a report to the membership.</p>
                    <strong>Section 4 – Nominating Committee</strong>
                    <p>A Nominating Committee shall be appointed annually by the President and shall consist of three (3) members: one (1) from the Board and two (2) from the membership. The Committee shall be announced at the summer meeting. The slate of Directors and Officers shall be presented with the notice of the Annual Meeting. Nominations may be made from the floor at the Annual Meeting, provided the candidate has given prior permission for submission of his or her name, and there are two (2) seconders to the nomination. If there are nominations from the floor, the election shall be held by secret ballot.</p>
                    <strong>Section 5 – Ex-Officio Board Members</strong>
                    <p>Upon action of the Board of Directors, any Committee Chairperson may serve as an Ex- officio Member of the Board of Directors, without a vote.</p>
                </Container>
            </div>
        )
    }
}


export default Index;
