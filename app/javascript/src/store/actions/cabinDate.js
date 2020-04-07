import * as actions from './actionTypes';

export const fetchCabinDates = () => {
    const url = "/api/v1/cabin_date/index";
    return dispatch => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    dispatch(fetchCabinDatesFail())
                }})
            .then(res => dispatch(fetchCabinDatesSuccess(res)))
    }
}

export const fetchCabinDatesSuccess = res => {
    return {
        type: actions.FETCH_CABIN_DATES_SUCCESS,
        res
    }
}

export const fetchCabinDatesFail = () => {
    return {
        type: actions.FETCH_CABIN_DATES_FAIL,
    }
}

export const addCabinDate = (cabin_id, startdate, enddate) => {
    const url = `/api/v1/cabin_date/create`;
    const body = {
        "cabin_id": cabin_id,
        "startdate": startdate,
        "enddate": enddate
    }
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        dispatch(addCabinDateInit())
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
                dispatch(addCabinDateFail())
            }
        })
        dispatch(addCabinDateSuccess())
    }
}

export const addCabinDateInit = () => {
    return {
        type: actions.LOADING_START
    }

}

export const addCabinDateSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const addCabinDateFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteCabinDate = id => {
    const url = `/api/v1/cabin_date/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    return dispatch => {
        dispatch(deleteCabinDateInit())
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                dispatch(deleteCabinDateFail())
            })
            .then(dispatch(deleteCabinDateSuccess()))
            .catch(error => console.log(error.message));
        }
}


export const deleteCabinDateInit = () => {
    return {
        type: actions.LOADING_START
    }
}

export const deleteCabinDateSuccess = () => {
    return {
        type: actions.LOADING_FINISH
    }
}

export const deleteCabinDateFail = () => {
    return {
        type: actions.LOADING_FINISH
    }
}