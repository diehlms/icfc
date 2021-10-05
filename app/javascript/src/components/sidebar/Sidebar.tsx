import React, { Component } from 'react'
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

interface LinkItem {
    description: string;
    link: string;
}

const SidebarWrapper = styled.div`
    height: 90vh;
    width: 15vw;
    overflow-y: scroll;
    position: relative;
    background-color: #eeeeee;
    border-right: 2px solid #ffffff;
`;

const SidebarItem = styled.div`
    padding: 12px;
    font-size: 14px;
    &:hover {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
`;

const SidebarSectionHeader = styled.div`
    font-size: 24px;
    padding: 12px;
`;

const Divider = styled.div`
    border-bottom: 1px solid #dddddd;
    position: relative;
    left: 12px;
    width: 80%;
`;


export default class Sidebar extends Component {
    render() {
        const internalLinks: LinkItem[] = [
            {
                description: 'In Season Reservations',
                link: '/articles'
            },
            {
                description: 'Out of Season Reservations',
                link: '/articles'
            },
            {
                description: 'Forum & Blog',
                link: '/articles'
            },
            {
                description: 'Events',
                link: '/events'
            },
            {
                description: 'Charts',
                link: '/charts'
            },
            {
                description: 'Directory',
                link: '/directories'
            },
            {
                description: 'Pictures',
                link: '/galleries'
            },
            ,
            {
                description: 'Cabins',
                link: '/cabins'
            }
        ];
        const externalLinks: LinkItem[] = [
            {
                description: 'Fishing Resources', 
                link: 'https://www.takemefishing.org/how-to-fish/how-to-catch-fish/national-fishing-and-boating-week/'
            },
            {
                description: 'Snake Guide', 
                link: 'https://www.scisnake.com/'
            },
            {
                description: 'Water Levels', 
                link: 'https://www.glerl.noaa.gov/data/dashboard/GLD_HTML5.html'
            },
            {
                description: 'Webcam', 
                link: 'http://www.thebowens.name/'
            },
            {
                description: 'Ice Coverage', 
                link: 'https://coastwatch.glerl.noaa.gov/glsea/cur/glsea_cur.png'
            },
            {
                description: 'GBLT', 
                link: 'https://www.gblt.org/'
            },
            {
                description: 'Sans Souci & Copperhead Association', 
                link: 'https://www.ssca.info/'
            },
            {
                description: 'Georgian Bay Association', 
                link: 'https://georgianbay.ca/'
            }
        ];
        return (
            <SidebarWrapper>
                <Nav>
                    {this.props.unauthorized ? (
                            <React.Fragment />
                        ) : (
                            <React.Fragment>
                                <SidebarSectionHeader>
                                    Internal Links
                                </SidebarSectionHeader>
                                <Divider />
                                {internalLinks.map((link: LinkItem) => (
                                    <SidebarItem>
                                        <a href={link.link}>{link.description}</a>
                                    </SidebarItem>
                                ))}
                            </React.Fragment>
                        )
                    }
                    <SidebarSectionHeader>
                        External Links
                    </SidebarSectionHeader>
                    <Divider />
                    {externalLinks.map((link: LinkItem) => (
                        <SidebarItem>
                            <a href={link.link}>{link.description}</a>
                        </SidebarItem>
                    ))}
                </Nav>
            </SidebarWrapper>
        )
    }
}
