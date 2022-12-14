import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getGroups } from '../../store/groups';
import './GroupsBrowser.css';

const GroupsIndex = () => {
    const dispatch = useDispatch();
    const groupObj = useSelector(state => state.groups.allGroups);
    // console.log('this is the groups received in GroupsIndex', groupObj);
    const groups = Object.values(groupObj);

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    if (!groups) return null;

    return (
        <main>
        <div className='top-portion-events-groups'>
        <div className='top-buffer'></div>
            <div className='events-groups'>
                <NavLink id='events-link' className='events-groups-links' activeClassName='active-link' key='events' to='/events'>Events</NavLink>
                <span className='distance'></span>
                <NavLink id='groups-link' className='events-groups-links' activeClassName='active-link' key='groups' to='/groups'>Groups</NavLink>
            </div>
        </div>
            <div className='main-groups'>
                <nav>
                    {groups.map((group, i) => {
                        return (
                            <div key={i} className={i === 0 ? 'group-fun-town' : 'group-container'}>
                            <NavLink key={group.id} to={`/groups/${group.id}`}>
                            <div className='group-preview-grid'>
                                <div className='group-preview-image'>
                                    <img className='thumbnail' src={`${group.previewImage}`} alt='thumbnail' onError={e => e.currentTarget.src = 'https://i.imgur.com/7EYSecN.png'} />
                                </div>
                                <div className='group-preview-info'>
                                    <h3 className='group-name'>{group.name}</h3>
                                    <h3 className='group-location uppercase'>{`${group.city}, ${group.state}`}</h3>
                                    <div className='group-about-container'><p className='group-about'>{group.about}</p></div>
                                    <p className='group-stats'>{`${!!group.numMembers ? group.numMembers : 0} ${group.numMembers > 1 || !group.numMembers ? 'members' : 'member'} `} 	&bull; {!!group.private ? 'Private' : 'Public'}</p>
                                </div>
                            </div>
                            </NavLink>
                            {/* <hr></hr> */}
                            </div>
                        )
                    })}
                </nav>
            </div>
        </main>
    )
}

export default GroupsIndex;
