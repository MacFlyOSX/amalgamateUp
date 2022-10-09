import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsersGroups } from "../../store/groups";
import MembershipModal from "../MembershipModal";
import './MyStuff.css'

const UsersGroups = () => {
    const dispatch = useDispatch();
    const userGroups = useSelector(state => state.groups.usersGroups);
    const groups = Object.values(userGroups);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUsersGroups())
    }, [dispatch]);

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
                            <NavLink key={group.id} to={`/groups/${group.id}`}>
                            <div className='group-preview-box'>
                                <div className='group-preview-image'>
                                    <img className='user-thumbnail' src={`${group.previewImage}`} alt='thumbnail' />
                                </div>
                                <div className='group-preview-info'>
                                    <h3 className='group-name'>{group.name}</h3>
                                    <h3 className='users-group-location uppercase'>{`${group.city}, ${group.state}`}</h3>
                                    <div className="users-members-area">
                                        <p className='users-group-stats'>{`${!!group.numMembers ? group.numMembers : 0} ${group.numMembers > 1 || !group.numMembers ? 'members' : 'member'} `}</p>
                                        <MembershipModal />
                                    </div>
                                </div>
                            </div>
                            </NavLink>
                            {/* <hr></hr> */}
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
