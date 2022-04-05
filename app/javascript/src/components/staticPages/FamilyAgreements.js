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
                    text="Family Agreements"
                />
                <Message>
                    <Message.Header>March 30, 2012</Message.Header>
                    <p>
                        Club Policy Regarding Family Agreements relating to ICFC expense sharing and membership transfer
                    </p>
                </Message>
                <Container text>
                    <p>The Club is aware that over the years quite a few ICFC member families have entered
                    into private agreements among family members to address and govern the sharing of ICFCrelated expenses (including cottage ownership, cottage maintenance and dues) among family
                    members. In some instances, family agreements also address the subjects of membership status
                    and transfers of membership among family members.</p>
                    <p>The Club recognizes that such agreements can be useful means of resolving uncertainty
                    regarding the issues that they address. The Club believes that it is appropriate for family
                    members to enter into such agreements when they desire to do so. The Club will honor
                    outcomes dictated by such agreements where the outcomes are consistent with existing Club ByLaws.</p>
                    <p>The Club will take no position regarding the enforceability of private family agreements.
                    It will offer no advice regarding the terms of such agreements, and will have no role in the
                    enforcement or interpretation of such agreements. In matters of Club affairs, the ICFC By-Laws
                    as drafted take precedence over anything to the contrary in a private family agreement. (By way
                    of example, it would be contrary to the By-Laws and the By-Laws would take precedence if a
                    family agreement said that siblings A and B were both deemed to be corporate members, even
                    though only one of them had been elected a corporate member and paid corporate dues.)</p>
                </Container>
            </div>
        )
    }
}


export default Index;
