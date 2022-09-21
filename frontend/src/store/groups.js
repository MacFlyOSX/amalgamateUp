import { ValidationError } from '../utils/validationError';

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

export const createGroup = group => async dispatch => {
    try {
        const response = await fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        });

        if(response.ok) {
            const newGroup = await response.json();
            dispatch(addGroup(newGroup));
            return newGroup;
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
    const response = await fetch(`/api/groups/${group.id}`, {
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

const initialState = { singleGroup: {} };

const groupReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const allGroups = {};
            action.list.Groups.forEach(group => allGroups[group.id] = group);
            return {...allGroups, ...state}
        case ADD:
            if(!state[action.group.id]) {
                const newState = {...state, [action.group.id]: action.group, singleGroup: action.group};
                return newState;
            }
            return { ...state, [action.group.id]: {...state[action.group.id], ...action.group}, singleGroup: action.group};
        default:
            return state;
    }
};

export default groupReducer;
