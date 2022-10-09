// import { ValidationError } from '../utils/validationError';
import { csrfFetch } from './csrf';

const LOAD = 'events/LOAD';
const ADD = 'events/ADD';
const DELETE = 'events/DELETE';
const GET_ONE = 'events/GET_ONE';
const UPDATE = 'events/UPDATE'

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
})

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

            // const resp = await csrfFetch(`/api/events/${newEvent.id}/attendance`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         eventId: newEvent.id,
            //         userId,
            //         status: 'member'
            //     })
            // });

            // if(resp.ok) {

                // console.log('attendance was created');

                // const attend = await resp.json();
                dispatch(addEvent(newEvent));
                return newEvent;
            // }
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

const initialState = { allEvents: {}, singleEvent: {} };

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const allEvents = {};
            action.list.Events.forEach(event => {
                allEvents[event.id] = event;
            });
            return { allEvents: {...allEvents}, singleEvent: {}};
            case GET_ONE: {
                const newState = {...state, singleEvent: {...state.singleEvent}};
                newState.singleEvent = action.event;
                return newState;
            }
            case ADD:{
                const newState = {...state, singleEvent: {...state.singleEvent}, allEvents: {...state.allEvents}};
                newState.singleEvent = action.event;
                newState.allEvents[action.event.id] = action.event;
                return newState;
            }
            case UPDATE: {
                const newState = {...state, allEvents:{...state.allEvents}, singleEvent: {...state.singleEvent}};
                newState.singleEvent = {...action.event};
                newState.allEvents[action.event.id] = action.event;
                return newState;
            }
            case DELETE:{
                const newState = {...state, singleEvent: {}};
                delete newState.allEvents[action.eventId];
                return {allEvents: {...newState.allEvents}, singleEvent:{}}
            }
            default:
            return state;
    }
};

export default eventReducer;
