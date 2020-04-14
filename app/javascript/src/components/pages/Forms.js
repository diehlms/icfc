import React from 'react'
import Title from "../../shared/Title"
import HorizontalLine from '../../shared/HorizontalLine'

export default function Forms() {
    return (
        <div className="containerMain">
            <Title
                text="Forms"
            />
            <HorizontalLine />
            <div className="panel panel-default">
            <div className="panel-heading">Leadership Team Forms</div>
                <ul className="list-group">
                    <a className="list-group-item" href="/2019_LeaderTeam_Application.pdf" target="_blank">2019 Leader Team App</a>
                    <a className="list-group-item" href="/2019_LeaderTeamApplicationInformation.pdf" target="_blank">Leader Team Information</a>
                </ul>
            </div>
            <div className="panel panel-default">
            <div className="panel-heading">Waitstaff Team Forms</div>
                <ul className="list-group">
                    <a className="list-group-item" href="/2020_Application for Wait Staff.doc" target="_blank">Application</a>
                    <a className="list-group-item" href="/2020_Application Information for Wait Staff.doc" target="_blank">Information</a>
                    <a className="list-group-item" href="/2020 Wait Staff Regulations.pdf" target="_blank">Regulations</a>
                    <a className="list-group-item" href="/2020_Emergency Medical Form for Wait Staff.doc" target="_blank">Medical</a>
                </ul>
            </div>
            <div className="panel panel-default">
            <div className="panel-heading">Dining Hall Forms</div>
                <ul className="list-group">
                    <a className="list-group-item" href="/2015_SpecialDietaryRequestForm.pdf" target="_blank">Dietary Request Forms</a>
                </ul>
            </div>
            <div className="panel panel-default">
            <div className="panel-heading">Work Order Forms</div>
                <ul className="list-group">
                    <a className="list-group-item" target="_blank" href="/WorkOrder.pdf">Work Order</a> 
                </ul>
            </div>
        </div>
    )
}
