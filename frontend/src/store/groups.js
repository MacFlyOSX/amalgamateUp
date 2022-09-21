import { ValidationError } from '../utils/validationError';
import { csrfFetch } from './csrf';

const LOAD = 'groups/LOAD';
const ADD = 'groups/ADD';
const DELETE = 'groups/DELETE';

const load = list => ({
    type: LOAD,
    list
});

const addGroup = group => ({
    type: ADD,
    group
});

const deleteGroup = groupId => ({
    type: DELETE,
    groupId
});

export const getGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        console.log('this is the list received from getGroups', list);
    }
};

export const getOneGroup = id => async dispatch => {
    const response  = await fetch(`/api/groups/${id}`);

    if(response.ok) {
        const group = await response.json();
        dispatch(addGroup(group));
        console.log(group);
    }
};

export const deleteOneGroup = id => async dispatch => {
    const response = await csrfFetch(`/api/groups/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const cool = await response.json();
        console.log('this is cool',cool);
        dispatch(deleteGroup(id));
    }
}

export const createGroup = (group, previewImage) => async dispatch => {
    try {
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

            if(res.ok) {
                const newImage = await res.json();
                dispatch(addGroup(newGroup));
                return newGroup;
            }
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
        dispatch(addGroup(updatedGroup));
        return updatedGroup;
    }
};

const initialState = { allGroups: {}, singleGroup: {} };

const groupReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const groupsList = {};
            action.list.Groups.forEach(group => groupsList[group.id] = group);
            return { allGroups: {...groupsList}, singleGroup: {}}
        case ADD:{
            if(!state.allGroups[action.group.id]) {
                const newState = {...state, singleGroup: {...state.singleGroup}, allGroups: {...state.allGroups}};
                newState.singleGroup = action.group;
                newState.allGroups[action.group.id] = action.group;
                return newState;
            }
            const newState = {...state, singleGroup: {}, allGroups: {...state.allGroups}};
            newState.singleGroup = {...state.singleGroup, ...action.group};
            newState.allGroups[action.group.id] = action.group;
            return newState;
            }
        case DELETE:
            const newState = {...state, singleGroup: {}};
            delete newState.allGroups[action.groupId];
            return newState;
        default:
            return state;
    }
};

export default groupReducer;
