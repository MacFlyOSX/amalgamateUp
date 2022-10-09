import { csrfFetch } from './csrf';

const LOAD = 'members/LOAD';
const ADD = 'members/ADD';
const DELETE = 'members/DELETE';
const UPDATE = 'members/UPDATE';

const load = (members, pending) => ({
    type: LOAD,
    members,
    pending
});

const addMember = member => ({
    type: ADD,
    member
});

const deleteMember = memberId => ({
    type: DELETE,
    memberId
});

const updateMember = memberId => ({
    type: UPDATE,
    memberId
});

export const getMembers = groupId => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/members`);

    if (response.ok) {
        const list = await response.json();
        let members = [];
        let pending = [];
        list.Members.forEach(ele => ele.Membership.status === "pending" ? pending.push(ele) : members.push(ele));
        dispatch(load(members, pending));
    }
};

export const addMembership = (membership) => async dispatch => {
    const { groupId } = membership;
    const response = await fetch(`/api/groups/${groupId}/membership`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(membership)
    });

    if (response.ok) {
        const newMember = await response.json();
        dispatch(addMember(newMember));
    }
};

export const deleteMembership = (groupId, memberId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/membership`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const cool = await response.json();

        dispatch(deleteMember(memberId))
    }
};

export const updateMembership = (groupId, memberId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/membership`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            memberId,
            status: 'member'
        })
    });

    if (response.ok) {
        const updatedMember = await response.json();
        dispatch(updateMember(updatedMember));
    }
};

const initialState = { members: {}, pending: {} };

const memberReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const memberList = {};
            const pendingList = {};
            action.pending.forEach(ele => pendingList[ele.id] = ele);
            action.members.forEach(ele => memberList[ele.id] = ele);
            return { members: {...memberList}, pending: {...pendingList} }
        }
        case ADD: {
            const newState = {...state, members: {...state.members}, pending: {...state.pending}};
            action.member.status === 'pending' ?
                            newState.pending[action.member.memberId] = action.member :
                            newState.members[action.member.memberId] = action.member;
            return newState;
        }
        case DELETE: {
            const newState = {...state, members: {...state.members}, pending: {...state.pending}};
            delete newState.members[action.memberId];
            return { members: {...newState.members}, pending: {...newState.pending} }
        }
        case UPDATE: {
            const newState = {...state, members: {...state.members}, pending: {...state.pending}};
            const member = newState.pending[action.memberId];
            delete newState.pending[action.memberId];
            member.status = 'member';
            return { members: {...newState.members, member}, pending: {...newState.pending} };
        }
        default:
            return state;
    }
}

export default memberReducer;
