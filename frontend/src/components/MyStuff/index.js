import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUsersGroups, deleteOneGroup } from "../../store/groups";
import { getMembers } from "../../store/members";
import MembershipModal from "../MembershipModal";
import './MyStuff.css'

const UsersGroups = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userGroups = useSelector(state => state.groups.usersGroups);
    const groups = Object.values(userGroups);
    const user = useSelector(state => state.session.user)
    const pendingObj = useSelector(state => state.memberships.pending);
    const pending = Object.values(pendingObj);

    useEffect(() => {
        dispatch(getUsersGroups());
        dispatch(getMembers());
    }, [dispatch]);

    const deleteClick = (groupId) => {
        const res = dispatch(deleteOneGroup(groupId));
        // console.log(res);
        history.push('/mystuff');
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
                    {groups.map((group, i) => {
                        return (
                            <div key={i} className={i === 0 ? 'users-group-fun-town' : 'users-group-container'}>
                            <div className='group-preview-box'>
                            <NavLink key={group.id} to={`/groups/${group.id}`}>
                                <div className='group-preview-image'>
                                    <img className='user-thumbnail' src={`${group.previewImage}`} alt='thumbnail' />
                                </div>
                            </NavLink>
                                <div className='group-preview-info'>
                                <NavLink key={group.id} to={`/groups/${group.id}`}>
                                    <p className='users-group-name'>{group.name}</p>
                                </NavLink>
                                    {/* <h3 className='users-group-location uppercase'>{`${group.city}, ${group.state}`}</h3> */}
                                    <div className="users-members-area">
                                        <p className='users-group-stats'>{`${!!group.numMembers ? group.numMembers : 0} ${group.numMembers > 1 || !group.numMembers ? 'members' : 'member'} `}</p>
                                        {pending.length ?
                                            <MembershipModal />
                                            : null}
                                    </div>
                                    <div className='users-buttons-side-by-side'>
                                        <NavLink to={`/groups/${group.id}/edit`} ><button className='users-group-deets-button'>
                                        Edit group
                                        </button></NavLink>
                                        <button onClick={() => deleteClick(group.id)} className='users-group-deets-button'>
                                                Delete group
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                </nav>
            </div>
            <div className="mystuff-events">

            </div>
        </div>
        </main>
    )
}

export default UsersGroups;
