import * as actions from './actionTypes';
import axios from 'axios'

export const fetchEvents = () => {
    const url = "/api/v1/events/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchEventsFail())
                }})
            .then(res => dispatch(fetchEventsSuccess(res)))
    }
}

export const fetchEventsSuccess = res => {
    return {
        type: actions.FETCH_EVENTS_SUCCESS,
        res
    }
}

export const fetchEventsFail = () => {
    return {
        type: actions.FETCH_EVENTS_FAIL,
    }
}

export const createEvent = (events, location, start_time, end_time, user_id, description) => {
    const url = "/api/v1/events/create";
    const body = {
        "events": events,
        "location": location,
        "start_time": start_time,
        "end_time": end_time,
        "user_id": user_id,
        "description": description
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        dispatch(createEventInit())
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                dispatch(createEventFail())
            }
        })
        .then(res => dispatch(createEventSuccess(res)))
    }
}

export const createEventInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const createEventSuccess = res => {
    return {
        type: actions.LOADING_FINISH,
        res
    }
}

export const createEventFail = err => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteEvent = id => {
    const url = `/api/v1/events/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        dispatch(deleteEventInit())
        axios.delete(url, {
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              }
            })
            .then(res => {
                if (res.ok) {
                    dispatch(deleteEventSuccess())
                }
            dispatch(deleteEventFail())
        })
    }
}

export const deleteEventInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const deleteEventSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteEventFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}