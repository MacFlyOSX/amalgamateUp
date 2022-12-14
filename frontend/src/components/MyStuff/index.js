import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUsersGroups } from "../../store/groups";
import { getUsersEvents } from "../../store/events";
import { deleteMembership, getAllMembers } from "../../store/members";
import MembershipModal from "../MembershipModal";
import './MyStuff.css';
import userorganizer from '../../icons/userorganizer.svg';
import findAnEvent from '../../icons/findAnEvent.svg';
import startAgroup from '../../icons/startAgroup.svg';

const UsersGroups = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ deleteMem, setDeleteMem ] = useState(false);
    const [ memArr, setMemArr ] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    const userGroups = useSelector(state => state.groups.usersGroups);
    const groups = Object.values(userGroups);

    const userEvents = useSelector(state => state.events.usersEvents);
    const events = Object.values(userEvents);
    const user = useSelector(state => state.session.user)
    const pending = useSelector(state => state.memberships.allMembers.pending);


    useEffect(() => {
        dispatch(getUsersGroups());
        dispatch(getUsersEvents());
        dispatch(getAllMembers());
        setDeleteMem(false);
    }, [dispatch, deleteMem]);

    async function delMem(groupId) {
        if (memArr.includes(groupId)) {
            const result = await dispatch(deleteMembership(groupId, user.id));
            setDeleteMem(true);
            setMemArr([]);
        } else {
            let temp = [...memArr];
            temp.push(groupId);
            setMemArr(temp);
        }
    }

    if (!groups) return null;

    return (
        <main>
        <div className='top-portion-mygroups'>
        <div className='top-buffer-mygroups'></div>
            <div className='user-groups'>
                <h1 className="hello">Welcome, {user.firstName} 👋</h1>
                <div className="title-flex-ge">
                <h3 className="user-groupsevents-title">Your groups</h3>
                <h3 className="user-groupsevents-title">Your events</h3>
                </div>
            </div>
        </div>
        <div className="user-container-mystuff">
            <div className='mystuff-usergroups'>
                <nav>
                    {groups?.length ? groups.map((group, i) => {
                        return (
                            <div key={i} className={i === 0 ? 'users-group-fun-town' : 'users-group-container'}>
                            <div className='group-preview-box'>
                                <div className='group-preview-image'>
                                    <img className='user-thumbnail' src={`${group.previewImage}`} alt='thumbnail' />
                                </div>
                                <div className='group-preview-info'>
                                    <div className="user-name-title-grid">
                                        {/* <p className='users-group-name'> */}
                                        {group.name}
                                        {/* </p> */}
                                    </div>
                                    <div className="users-members-area">
                                        <p className='users-group-stats'>{`${!!group.numMembers ? group.numMembers : 0} ${group.numMembers > 1 || !group.numMembers ? 'members' : 'member'} `}</p>
                                        {sessionUser.id === group?.organizerId && pending?.[group.id]?.length ?
                                            <MembershipModal groupId={group.id} /> :
                                             null}
                                    </div>
                                    <div className='more-info-org-icon'>
                                        <button className='users-group-deets-button'>
                                            <NavLink className='users-more-info-button' key={group.id} to={`/groups/${group.id}`}>
                                                More Info
                                            </NavLink>
                                        </button>
                                        {sessionUser.id === group?.organizerId ? <div className="tooltip"><img className="organizer-icon tooltip" src={userorganizer} alt='user' /><span className="tooltiptext tooltip-top">You are the{'\n'}organizer</span></div> : <span />}
                                        {sessionUser.id !== group?.organizerId ?
                                                <button onClick={() => delMem(group.id)} className='users-group-deets-button' id='leave-group'>{ memArr.includes(group.id) ? 'Confirm' : 'Leave Group' }</button> : null}
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    }) : <div className="nothing-container"><img className="no-group" src={startAgroup} alt='nogroup'/><p className="no-group-here">No groups yet</p></div>}
                </nav>
            </div>
            <div className="users-gap"></div>
            <div className="mystuff-events">
            <nav>
                    {events?.length ? events.map((event, i) => {
                        return (
                            <div key={i} className={i === 0 ? 'users-group-fun-town' : 'users-group-container'}>
                            <div className='group-preview-box'>
                                <div className='group-preview-image'>
                                    <img className='user-thumbnail' src={`${event.previewImage}`} alt='thumbnail' />
                                </div>
                                <div className='group-preview-info'>
                                    <div className="user-event-title-grid">
                                        <p className='users-group-name'>{event.name}</p>
                                        <p className="users-event-date">{`${event.startMD}`} • {event.startTime}</p>
                                    </div>
                                    <div className="users-members-area">
                                        <p className='users-group-stats'>{`${!!event.numAttending ? event.numAttending : 0} ${event.numAttending > 1 || !event.numAttending ? 'attendees' : 'attendee'} `}</p>
                                        {pending.length ?
                                            <MembershipModal />
                                            : null}
                                    </div>
                                    <div className='more-info-org-icon'>
                                        <button className='users-group-deets-button'>
                                            <NavLink className='users-more-info-button' key={event.id} to={`/events/${event.id}`}>
                                                More Info
                                            </NavLink>
                                        </button>
                                        {sessionUser.id === event?.hostId ? <div className="tooltip"><img className="organizer-icon tooltip" src={userorganizer} alt='user' /><span className="tooltiptext tooltip-top">You are the{'\n'}event host</span></div> : <span />}
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    }) : <div className="nothing-container"><img className="no-group" src={findAnEvent} alt='nogroup'/><p className="no-group-here">No events yet</p></div>}
                </nav>
            </div>
        </div>
        </main>
    )
}

export default UsersGroups;
