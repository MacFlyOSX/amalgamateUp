import { ValidationError } from '../utils/validationError';

const LOAD = 'events/LOAD';
const ADD = 'events/ADD';

const load = list => ({
    type: LOAD,
    list
});

const addEvent = event => ({
    type: ADD,
    event
});

export const getEvents = () => async dispatch => {
    const response = await fetch('/api/events');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        console.log('this is the list received from getEvents', list);
    }
};

export const getOneEvent = id => async dispatch => {
    const response  = await fetch(`/api/events/${id}`);

    if(response.ok) {
        const event = await response.json();
        dispatch(addEvent(event));
        console.log(event);
    }
};

export const createEvent = event => async dispatch => {
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        if(response.ok) {
            const newEvent = await response.json();
            dispatch(addEvent(newEvent));
            return newEvent;
        } else {
            let error;
            if(response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            } else {
                let errorJSON;
                error = await response.text();
                try {
                  errorJSON = JSON.parse(error);
                }
                catch {
                  throw new Error(error);
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
            }
        }
    } catch(error) {
        throw error;
    }
};

export const updateEvent = event => async dispatch => {
    const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });

    if(response.ok) {
        const updatedEvent = await response.json();
        dispatch(addEvent(updatedEvent));
        return updatedEvent;
    }
};

const initialState = {};

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const allEvents = {};
            action.list.Events.forEach(event => {
                allEvents[event.id] = event;
            });
            return {...allEvents, ...state}
        case ADD:
            if(!state[action.event.id]) {
                const newState = {...state, [action.event.id]: action.event};
                const eventList = newState.list.map(id => newState[id]);
                eventList.push(action.event);
                return newState;
            }
            return { ...state, [action.event.id]: {...state[action.event.id], ...action.event}};
        default:
            return state;
    }
};

export default eventReducer;
