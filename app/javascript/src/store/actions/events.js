import * as actions from './actionTypes';

const dbRef = '/api/v1/events/index'

export const fetchEventsStart = () => {
    return {
        type: actions.FETCH_EVENTS_START
    }
}

export const fetchEventsSuccess = eventsArr => {
    return {
        type: actions.FETCH_EVENTS_SUCCESS,
        eventsArr
    }
}

export const fetchEventsFail = error => {
    return {
        type: actions.FETCH_EVENTS_FAIL,
        error
    }
}

export const fetchEvents = () => {
    return dispatch => {
        dispatch(fetchEventsStart())
        fetch(dbRef)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch(fetchEventsFail("network response was not ok"))
            })
            .then(res => dispatch(fetchEventsSuccess(res)))
            .catch(() => this.props.history.push("/"))
    }
}

export const createEvent = () => {
    return {
        type: actions.CREATE_EVENT
    }
}

export const deleteEvent = () => {
    return {
        type: actions.DELETE_EVENT
    }
}

export const editEvent = () => {
    return {
        type: actions.EDIT_EVENT
    }
}