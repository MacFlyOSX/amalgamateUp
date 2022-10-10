// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteMembership, getAllMembers, updateMembership } from "../../store/members";

function EditMembers({groupId}) {
  const dispatch = useDispatch();
  const pending = useSelector(state => state.memberships.allMembers.pending);
  const people = pending[groupId];


    useEffect(() => {
        dispatch(getAllMembers());
    }, [dispatch]);

  const approveMember = async (memberId) => {
    const result = await dispatch(updateMembership(groupId, memberId));
    if (result) {
      dispatch(getAllMembers());
    }
  };
  const denyMember = async (memberId) => {
    const result = await dispatch(deleteMembership(groupId, memberId));
    if (result) {
      dispatch(getAllMembers());
    }
  };

  return (
    <div className="request-container">
        {people.map((person, i) => {
          return (
            <div key={i} className="each-member">
              <span className="member-name">{person.name}</span>
              <span className="member-buttons">
                <button onClick={() => approveMember(person.userId)} className="member-func-button">Approve</button>
                <button onClick={() => denyMember(person.userId)} className="member-func-button">Deny</button>
              </span>
            </div>
          )
        })}
    </div>
  );
}

export default EditMembers;
