import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

export class Index extends Component {
    componentDidMount() {
        this.props.onFetchEvents()
    }

    render() {
        let events = 'not loaded yet, ya binch'

        if (!this.props.loading && this.props.events[1] && this.props.events[1].events) {
            events = this.props.events[1].events.map(event => {
                return (
                    <div>
                        <h1>{event.events}</h1>
                        <p>{event.location}</p>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Events</h1>
                <div>{events}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(actions.fetchEvents())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)