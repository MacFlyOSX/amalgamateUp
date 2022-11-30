import { csrfFetch } from './csrf';

const LOAD_ONE = 'attendees/LOAD_ONE';
const ADD = 'attendees/ADD';
const DELETE = 'attendees/DELETE';
const UPDATE = 'attendees/UPDATE';

const loadOne = (attendees, pending) => ({
    type: LOAD_ONE,
    attendees,
    pending
})

const addAttendee = attendee => ({
    type: ADD,
    attendee
});

const deleteAttendee = attendeeId => ({
    type: DELETE,
    attendeeId
});

const updateAttendee = attendee => ({
    type: UPDATE,
    attendee
});

export const getAttendees = eventId => async dispatch => {
    const response = await fetch(`/api/events/${eventId}/attendees`);

    if (response.ok) {
        const list = await response.json();
        let attendees = [];
        let pending = [];
        list.Attendees.forEach(ele => ele.Attendance.status === "pending" ? pending.push(ele) : attendees.push(ele));
        dispatch(loadOne(attendees, pending));
        return list;
    }
};

export const addAttendance = (attendance) => async dispatch => {
    const { eventId } = attendance;
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendance)
    });

    if (response.ok) {
        const newAttendee = await response.json();
        dispatch(addAttendee(newAttendee));
        return newAttendee;
    }
};

export const deleteAttendance = (eventId, attendeeId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const cool = await response.json();

        dispatch(deleteAttendee(attendeeId))
        return cool;
    }
};

export const updateAttendance = (eventId, attendeeId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attendeeId,
            status: 'member'
        })
    });

    if (response.ok) {
        const updatedAttendee = await response.json();
        dispatch(updateAttendee(updatedAttendee));
        return updateAttendee;
    }
};

const initialState = { allAttendees: { attendees: {}, pending: {} }, single: { attendees: {}, pending: {} } };

const attendeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ONE: {
            const newState = {...state, allAttendees: {...state.allAttendees}, single: {attendees: {...state.single.attendees}, pending: {...state.single.pending}}};
            const attendeeList = {};
            const pendingList = {};
            action.pending.forEach(ele => pendingList[ele.id] = ele);
            action.attendees.forEach(ele => attendeeList[ele.id] = ele);
            return { allAttendees: {...newState.allAttendees}, single: { attendees: {...attendeeList}, pending: {...pendingList} } }
        }
        case ADD: {
            const newState = {...state, allAttendees: {...state.allAttendees}, single: {attendees: {...state.single.attendees}, pending: {...state.single.pending}}};
            action.attendee.status === 'pending' ?
                            newState.single.pending[action.attendee.attendeeId] = action.attendee :
                            newState.single.attendees[action.attendee.attendeeId] = action.attendee;
            return newState;
        }
        case DELETE: {
            const newState = {...state, allAttendees: {...state.allAttendees}, single: {attendees: {...state.single.attendees}, pending: {...state.single.pending}}};
            delete newState.single.attendees[action.attendeeId];
            return newState;
        }
        case UPDATE: {
            const newState = {...state, allAttendees: {...state.allAttendees}, single: {attendees: {...state.single.attendees}, pending: {...state.single.pending}}};
            if (action.attendee.status === 'pending') delete newState.allAttendees.pending[action.attendee.eventId][action.attendee.attendeeId];
            newState.allAttendees.attendees[action.attendee.eventId][action.attendee.attendeeId] = action.attendee
            return newState;
        }
        default:
            return state;
    }
}

export default attendeeReducer;
