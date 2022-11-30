import { csrfFetch } from './csrf';

const LOAD = 'members/LOAD';
const LOAD_ONE = 'members/LOAD_ONE';
const ADD = 'members/ADD';

const load = (members, pending) => ({
    type: LOAD,
    members,
    pending
});

const loadOne = (members, pending) => ({
    type: LOAD_ONE,
    members,
    pending
})

const addMember = member => ({
    type: ADD,
    member
});

export const getAllMembers = () => async dispatch => {
    const response = await fetch('/api/groups/members');

    if (response.ok) {
        const list = await response.json();
        const { members, pending } = list;
        dispatch(load(members, pending));
        return list;
    }
}

export const getMembers = groupId => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/members`);

    if (response.ok) {
        const list = await response.json();
        let members = [];
        let pending = [];
        list.Members.forEach(ele => ele.Membership.status === "pending" ? pending.push(ele) : members.push(ele));
        dispatch(loadOne(members, pending));
        return list;
    }
};

export const addMembership = (membership) => async dispatch => {
    const { groupId } = membership;
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(membership)
    });

    if (response.ok) {
        const newMember = await response.json();
        dispatch(addMember(newMember));
        return newMember;
    }
};

export const deleteMembership = (groupId, memberId) => async dispatch => {
    console.log('we are in the delete membership');
    const response = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const cool = await response.json();
        return await getAllMembers();
    }
};

export const updateMembership = (groupId, memberId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
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
        return await getAllMembers();
    }
};

const initialState = { allMembers: { members: {}, pending: {} }, members: {}, pending: {} };

const memberReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const newState = {...state, allMembers: {...state.allMembers, members: {...state.allMembers.members}, pending: {...state.allMembers.pending}}, members: {...state.members}, pending: {...state.pending}};
            const allMembers = {members: {...action.members}, pending: {...action.pending}};
            newState.allMembers = allMembers;
            return newState;
        }
        case LOAD_ONE: {
            const newState = {...state, allMembers: {...state.allMembers, members: {...state.allMembers.members}, pending: {...state.allMembers.pending}}, members: {...state.members}, pending: {...state.pending}};
            const memberList = {};
            const pendingList = {};
            action.pending.forEach(ele => pendingList[ele.id] = ele);
            action.members.forEach(ele => memberList[ele.id] = ele);
            return { allMembers: {...newState.allMembers}, members: {...memberList}, pending: {...pendingList} }
        }
        case ADD: {
            const newState = {...state, allMembers: {...state.allMembers, members: {...state.allMembers.members}, pending: {...state.allMembers.pending}}, members: {...state.members}, pending: {...state.pending}};
            if (action.member.status === 'pending') {
                newState.allMembers.pending[action.member.memberId] = action.member;
                newState.pending[action.member.memberId] = action.member;
            } else {
                newState.members[action.member.memberId] = action.member;
                newState.allMembers.members[action.member.memberId] = action.member;
            }
            return newState;
        }
        default:
            return state;
    }
}

export default memberReducer;
