import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Title from '../../shared/Title'
import SubTitle from '../../shared/SubTitle'
import HorizontalLine from '../../shared/HorizontalLine'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

function createMarkup(text) {
    return {__html: text};
}

function DateRow(props) {
    return (
        <div style={{
            display: 'flex',
            flex: 1
        }}>
            <Grid container>
                <div>
                    From: {props.start_time}
                </div>
                <div>
                    To: {props.end_time}
                </div>
            </Grid>
        </div>
    )
}

class Show extends React.Component {
    componentDidMount = () => {
        this.props.onFetchEvents()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchEvents();
        }
    }

    removeEvent = (id) => {
        this.props.onRemoveEvent(id)
        this.props.history.push("/events")
    }

    render() {
        let body = ""
        if (this.props.events[1] && this.props.events[1].events) {
            const { id, user_id, events, description, location, start_time, end_time } = this.props.events[1].events.find(event => 
                event.id.toString() === this.props.match.params.id.toString()
            )
            
            function EventContent(props) {
                return (
                    <div className="articleContent">
                        <div dangerouslySetInnerHTML={createMarkup(props.content)} />
                    </div>
                )
            }

            body = (
                <div>
                    <Title text={events} />
                    <SubTitle text={location} />
                    {user_id === this.props.user_id ? (
                        <IconButton onClick={this.removeEvent.bind(this, id)}>
                            <HighlightOffIcon />
                        </IconButton>
                    ) : null }
                    <HorizontalLine />
                    <DateRow
                        start_time={start_time}
                        end_time={end_time}
                    />
                    <EventContent
                        content={description}
                    />
                </div>
            )
        }

        return (
            <div className="containerMain">
                {body}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(actions.fetchEvents()),
        onRemoveEvent: (id) => dispatch(actions.deleteEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
