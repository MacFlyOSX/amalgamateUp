// import { ValidationError } from '../utils/validationError';
import { csrfFetch } from './csrf';

const LOAD = 'events/LOAD';
const ADD = 'events/ADD';
const DELETE = 'events/DELETE';
const GET_ONE = 'events/GET_ONE';
const UPDATE = 'events/UPDATE'
const GET_USERS = 'events/GET_USERS'

const getUsers = list => ({
    type: GET_USERS,
    list
});

const load = list => ({
    type: LOAD,
    list
});

const addEvent = event => ({
    type: ADD,
    event
});

const deleteEvent = eventId => ({
    type: DELETE,
    eventId
});

const getOne = event => ({
    type: GET_ONE,
    event
});

const update = event => ({
    type: UPDATE,
    event
});

export const getUsersEvents = () => async dispatch => {
    const response = await fetch(`/api/events/current`);

    if (response.ok) {
        const list = await response.json();
        dispatch(getUsers(list.Events));
    }
}

export const getEvents = () => async dispatch => {
    const response = await fetch('/api/events');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        // console.log('this is the list received from getEvents', list);
    }
};

export const getOneEvent = id => async dispatch => {
    const response  = await fetch(`/api/events/${id}`);

    if(response.ok) {
        const event = await response.json();
        dispatch(getOne(event));
        // console.log(event);
    }
};

export const deleteOneEvent = id => async dispatch => {
    const response = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const event = await response.json();
        // console.log('this is deleted event response', event);
        dispatch(deleteEvent(id));
    }
}

export const createEvent = (event, groupId, previewImage, userId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

    if(response.ok) {
        const newEvent = await response.json();

        console.log('event was created');

        const res = await csrfFetch(`/api/events/${newEvent.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: previewImage,
                preview: true
            })
        });
        if(res.ok) {
            const newImage = await res.json();

            console.log('image was created');
                dispatch(addEvent(newEvent));
                return newEvent;
            }
    }
};

export const updateEvent = event => async dispatch => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

    if (response.ok) {
        const updatedEvent = await response.json();

        dispatch(update(updatedEvent));

        return updatedEvent;
    }
}

const initialState = { allEvents: {}, singleEvent: {}, usersEvents: {} };

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const allEvents = {};
            action.list.Events.forEach(event => {
                allEvents[event.id] = event;
            });
            return { allEvents: {...allEvents}, singleEvent: {}, usersEvents: {} };
            case GET_ONE: {
                const newState = {...state, singleEvent: {...state.singleEvent}, allEvents: {...state.allEvents}, usersEvents: {...state.usersEvents} };
                newState.singleEvent = action.event;
                return newState;
            }
            case ADD:{
                const newState = {...state, singleEvent: {...state.singleEvent}, allEvents: {...state.allEvents}, usersEvents: {...state.usersEvents} };
                newState.singleEvent = action.event;
                newState.allEvents[action.event.id] = action.event;
                return newState;
            }
            case UPDATE: {
                const newState = {...state, allEvents:{...state.allEvents}, singleEvent: {...state.singleEvent}, usersEvents: {...state.usersEvents} };
                newState.singleEvent = {...action.event};
                newState.allEvents[action.event.id] = action.event;
                return newState;
            }
            case DELETE:{
                const newState = {...state, allEvents:{...state.allEvents}, singleEvent: {...state.singleEvent}, usersEvents: {...state.usersEvents} };
                delete newState.allEvents[action.eventId];
                return {allEvents: {...newState.allEvents}, singleEvent:{}, usersEvents: {} }
            }
            case GET_USERS: {
                const newState = {...state, allEvents: { ...state.allEvents }, singleEvent: {...state.singleEvent}, usersEvents: {...state.usersEvents} };
                newState.usersEvents = {...action.list};
                return newState;
            }
            default:
            return state;
    }
};

export default eventReducer;
