import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import CreateEvent from './Create'
import { Link } from 'react-router-dom'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

let Basic = props => (
    <Calendar
      events={props.events}
      views={allViews}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
      style={{ height: 500 }}
    />
  )

let allViews = Object.keys(Views).map(k => Views[k])

class Index extends React.Component {
    state = {
        createEventModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchEvents()
    }

    openModal = () => {
        this.setState({createEventModalOpen: true});
    }
    
    closeModal = () => {
        this.setState({createEventModalOpen: false});
    }

    removeEvent = id => {
        this.props.onRemoveEvent(id)
    }

    render() {
        let events = '';
        let eventList = [];
        if (!this.props.loading && this.props.events && this.props.events[1] && this.props.events[1].events) {
            events = this.props.events[1].events.map((event, index) => {
                eventList.push({
                    title: <Link to={`/events/${event.id}`}>{event.events}</Link>,
                    allDay: true,
                    start: new Date(event.start_time),
                    end: new Date(event.end_time)
                })
                return (
                    <div key={index}>
                        <Link to={`/events/${event.id}`}>{event.events}</Link>
                        <button onClick={this.removeEvent.bind(this, event.id)}>X</button>
                    </div>
                )
            })
        }

        return (
            <div>
                <h1>Events</h1>
                <Button onClick={this.openModal}>
                    Add Event
                </Button>
                <Basic
                    events={eventList}
                />
                <Modal
                    isOpen={this.state.createEventModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <CreateEvent />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(actions.fetchEvents()),
        onRemoveEvent: (id) => dispatch(actions.deleteEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);