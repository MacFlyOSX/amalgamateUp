
const LOAD = 'oneGroup/LOAD';
const UPDATE = 'oneGroup/UPDATE';
const DELETE = 'oneGroup/DELETE';

const load = group => ({
    type: LOAD,
    group
});

const updateGroup = groupId => ({
    type: UPDATE,
    groupId
});

const deleteGroup = group => ({
    type: DELETE,
    
})
