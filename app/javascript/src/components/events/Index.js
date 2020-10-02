import * as actions from '../../store/actions/index';

// libraries
import { Calendar, momentLocalizer } from 'react-big-calendar';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BarLoader from 'react-spinners/BarLoader';
import { 
    Button
}  from 'react-bootstrap';
import styled from 'styled-components';
import Modal from 'react-modal';
import DOMPurify from 'dompurify'

// styles
import 'react-big-calendar/lib/sass/styles';

const localizer = momentLocalizer(moment);

const AddEventButton = styled.button`
    display: flex;
    flex: 1;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #eee;
`;

const EventModalWrapper = styled.div`
    z-index: 9999;
`;

class Index extends React.Component {
    state = {
        showedUser: null,
        newEventModalShow: false,
        showEventModalShow: false,
        selectedEvent: null
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.onFetchEvents();
    }

    goToNewEventPage() {
        this.props.history.push("/events/new");
    }
      
    handleCloseModal() {
        this.setState({ 
            newEventModalShow: false,
            showEventModalShow: false
        });
    }

    openNewEventModal(event) {
        this.setState({ 
            newEventModalShow: true,
            showEventModalShow: false
        });
    }

    openShowEventModal(event) {
        this.setState({ 
            showEventModalShow: true,
            newEventModalShow: false,
            selectedEvent: event
        });
    }

    editEvent(id) {
        this.props.history.push(`/events/${id}/edit`);
        window.location.reload();
    }

    deleteEvent(id) {
        this.props.onDeleteEvent(id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchEvents(this.props.user_id);
        }
    }

    render() {
        let events = [];
        if (this.props.events[1] && this.props.events[1].events) {
            this.props.events[1].events.map(event => {
                events.push({
                    id: event.id,
                    title: <Button onClick={() => this.openShowEventModal(event)}>{event.events}</Button>,
                    start: event.start_time,
                    end: event.end_time,
                    allDay: true
                });
            })
        }
        return (
            <div className="container">
                <AddEventButton onClick={() => this.openNewEventModal(null)}>Add an Event</AddEventButton>
                {events ? (
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                ) : (
                    <BarLoader />
                )}
                <Modal 
                    isOpen={this.state.newEventModalShow}
                >
                    <EventModalWrapper>
                        <h1>Add New Event</h1> 
                        <button onClick={() => this.handleCloseModal()}>Close Modal</button>
                    </EventModalWrapper>
                </Modal>
                <Modal
                    isOpen={this.state.showEventModalShow}
                >
                    <EventModalWrapper>
                        {this.state.selectedEvent ? (
                            <React.Fragment>
                                <h1>{this.state.selectedEvent.events}</h1>
                                <p>{this.state.selectedEvent.location}</p>
                                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.selectedEvent.description)}}></p>
                                { this.state.selectedEvent.user_id === this.props.user_id ? (
                                    <React.Fragment>
                                        <Button onClick={() => this.editEvent(this.state.selectedEvent.id)}>Edit this Event</Button>
                                        <Button onClick={() => this.deleteEvent(this.state.selectedEvent.id)}>Delete this Event</Button>
                                    </React.Fragment>
                                ) : null}
                            </React.Fragment>
                        ) : (
                            <BarLoader />
                        )}
                        <button onClick={() => this.handleCloseModal()}>Close Modal</button>
                    </EventModalWrapper>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        loading: state.loading,
        events: state.events,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(actions.fetchEvents()),
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onDeleteEvent: id => dispatch(actions.deleteEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
