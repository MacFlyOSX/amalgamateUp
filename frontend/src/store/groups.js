// import { ValidationError } from '../utils/validationError';
import { csrfFetch } from './csrf';

const LOAD = 'groups/LOAD';
const ADD = 'groups/ADD';
const DELETE = 'groups/DELETE';
const GET_ONE = 'groups/GET_ONE';
const UPDATE = 'groups/UPDATE';

const load = list => ({
    type: LOAD,
    list
});

const addGroup = (group, events) => ({
    type: ADD,
    group,
    events
});

const deleteGroup = groupId => ({
    type: DELETE,
    groupId
});

const getOne = (group, events) => ({
    type: GET_ONE,
    group,
    events
});

const update = (group, events) => ({
    type: UPDATE,
    group,
    events
});

export const getGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        // console.log('this is the list received from getGroups', list);
    }
};

export const getOneGroup = id => async dispatch => {
    const response  = await fetch(`/api/groups/${id}`);

    if(response.ok) {
        const group = await response.json();

        const res = await fetch(`/api/groups/${id}/events`);

        if(res.ok) {
            const events = await res.json();

            dispatch(getOne(group, events));
        }
    }
};

export const deleteOneGroup = id => async dispatch => {
    const response = await csrfFetch(`/api/groups/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const cool = await response.json();
        // console.log('this is cool',cool);
        dispatch(deleteGroup(id));
    }
}

export const createGroup = (group, previewImage) => async dispatch => {
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });

    if(response.ok) {
        const newGroup = await response.json();
        const res = await csrfFetch(`/api/groups/${newGroup.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: previewImage,
                preview: true
            })
        });

        const id = newGroup.id;

        if(res.ok) {
            const newImage = await res.json();

            const resp = await fetch(`/api/groups/${id}/events`);

            if(resp.ok) {
            const events = await resp.json();

            dispatch(addGroup(newGroup, events));
            return newGroup;
            }
        }
    }
};

export const updateGroup = group => async dispatch => {
    const response = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });

    if(response.ok) {
        const updatedGroup = await response.json();

        const id = updatedGroup.id;

        const res = await fetch(`/api/groups/${id}/events`);

        if(res.ok) {
            const events = await res.json();

            dispatch(update(updatedGroup, events));

            return updatedGroup;
        }
    }
};

const initialState = { allGroups: {}, singleGroup: { events: {} } };

const groupReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:{
            const groupsList = {};
            action.list.Groups.forEach(group => groupsList[group.id] = group);
            return { allGroups: {...groupsList}, singleGroup: { events: {} }}
        }
        case GET_ONE: {
            const newState = {...state, singleGroup: {...state.singleGroup, events: {...state.singleGroup.events}}};
            newState.singleGroup = {...action.group, events: {...state.singleGroup.events} };
            const newEvents = {};
            action.events.Events.forEach(event => newEvents[event.id] = event);
            newState.singleGroup.events = newEvents;
            return newState;
        }
        case ADD:{
            const newState = {...state, singleGroup: {...state.singleGroup, events: {...state.singleGroup.events}}, allGroups: {...state.allGroups}};
            newState.singleGroup = {...action.group, events: {}};
            action.events.Events.forEach(event => newState.singleGroup.events[event.id] = event);
            newState.allGroups[action.group.id] = action.group;
            return newState;
        }
        case UPDATE: {
            const newState = {...state, singleGroup: {...state.singleGroup, events:{...state.singleGroup.events}}, allGroups: {...state.allGroups}};
            newState.singleGroup = { ...action.group, events:{} };
            action.events.Events.forEach(event => newState.singleGroup.events[event.id] = event);
            newState.allGroups[action.group.id] = action.group;
            return newState;
        }
        case DELETE:{
            const newState = {...state, allGroups: { ...state.allGroups }, singleGroup: { events: {}}};
            delete newState.allGroups[action.groupId];
            return newState;
        }
        default:
            return state;
    }
};

export default groupReducer;
