import React from 'react'
import Title from '../../shared/Title'
import HorizontalLine from '../../shared/HorizontalLine'

export default function Archives() {
    return (
        <div className="containerMain">
            <Title
                text="Archives"
            />
            <HorizontalLine />
            <div className="panel panel-default">
                <div className="panel-heading">Daily Bilges</div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Back Bay Bilges</div>
            </div>
        </div>
    )
}