import React from 'react';
import Title from '../shared/PageTitle';
import { Container, Header } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'

class Index extends React.Component {
    state = {
    }

    render() {

        return (
            <div className="reactPageAppContainer">
                <Title 
                    size="h1"
                    text="Charitable Giving"
                />
                <Message>
                    <Message.Header>ICFC Endowment Fund and Charitable Gift Funds</Message.Header>
                    <p>
                        The Endowment Policy Recomendations - Approved November 2, 2013
                    </p>
                    <p>
                    The Endowment Funds Goals - September 25, 2013
                    </p>
                </Message>
                <Container text>
                        <p>Both the Endowment and Charitable Gift Funds represent strategic priorities for Iron City: the Endowment to ensure the Club’s long-term financial future & stability, and the Charitable Gift Fund to contribute to the needs of the Greater Parry Sound community.</p>
                        <p>For either fund, donations can be made at any time by check or gift of marketable securities. Iron City members are also encouraged to consider making a planned gift to one or both funds, either through a gift of cash or marketable securities in their will, or designating the Fund(s) as a beneficiary of their life insurance policy. For information, contact any member of the Charitable Gift and Endowment Funds Committees or the Treasurer. Your support is welcomed.</p>
                        <strong><p>IRON CITY FISHING CLUB ENDOWMENT FUND</p></strong>
                        <em><p>Our Fund for the Future</p></em>
                        <p>The ICFC Endowment Fund was established to ensure the sustained health of ICFC and serve as a reserve should an unexpected expenditure arise and/or monies be needed to help in the operation of the Club. All monies are collected and maintained in US currency. Many large capital projects have received loans from the Endowment Fund in the past: for example, the dining hall renovation, water tower repair, and the purchase of land. Monies borrowed from the Endowment Fund to meet these expenses are repaid from operational income.</p>
                        <p>In some circumstances, and only if the Endowment Fund is able to maintain certain levels, the Club has the ability to withdraw monies to fund infrastructure and capital projects without repayment. The Endowment Fund has served as an important resource for the Club throughout the years, and many of our members continue to support the Endowment Fund generously by donating money in memory of loved ones or fellow members.</p>
                        <p>Donations can be made at any time of the year in either check form or transfer of marketable securities. Donations are not tax deductible. Checks, should be made payable to ICFC Endowment Fund and mailed to:</p>
                        <Message info>
                                <em><p>Brian Huber</p>
                                <p>135 High Point Walk</p>
                                <p>Sandy Springs, GA 30342</p></em>
                                <p>or phone him at: <em>404-240-5464</em></p>
                                <p>or email him at: <em>brian.huber@wellsfargoadvisors.com</em></p>
                        </Message>
                        <strong><p>IRON CITY FISHING CLUB CHARITABLE GIFT FUND</p></strong>
                        <p>Making a Commitment to Education, the Arts and the Environment, in our Georgian Bay Community</p>
                        <p>This fund is used for charitable purposes that benefit the Georgian Bay area. The Fund has contributed to community projects such as Parry Sound High School “First Generation” scholarships, the West Parry Sound Health Centre’s Nurses’ Skills Upgrade Program, the Festival of the Sound, the Georgian Bay Land Trust, and Georgian Bay Forever.</p>
                        <p>Donations to this Fund, managed by The Pittsburgh Foundation ('TPF'), are tax deductible when made directly to TPF for Iron City Fishing Club Charitable Gift Fund. Contributions can be made in US funds online at <a href='https://community.pittsburghfoundation.org/page.aspx?pid=298&fid=UFxl2d4w9r8%3d&fdesc=akeoWcyY1DqiNZlcPVg5IG4X%2b9z3rivZsbvCHuNZCfGARFwY%2bSFiStdrINVJsG5w'>Pittsburgh Foundation</a> using Visa or MasterCard, or via a transfer of marketable securities, or by check mailed to The Pittsburgh Foundation, attn.: Kelly Uranker, Five PPG Place, Suite 250, Pittsburgh, PA 15222-5414. Her phone number there is 412-394-2604, ext. 204, and her email urankerk@pghfdn.org.</p>
                </Container>
            </div>
        )
    }
}


export default Index;
