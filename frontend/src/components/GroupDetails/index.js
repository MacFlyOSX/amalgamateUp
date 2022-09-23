import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup } from '../../store/groups';
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './GroupDetails.css';
import { deleteOneGroup } from '../../store/groups';
import { NavLink } from 'react-router-dom';
import noevents from '../../icons/noevents.svg';


const GroupDetails = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { groupId } = useParams();
    const dispatch = useDispatch();
    // console.log('this is the sessionUser', sessionUser);
    // const [popup, setPopup] = useState(false);
    // console.log('this is the groupId', groupId)

    const group = useSelector(state => state.groups.singleGroup);
    // console.log('this is the group', group);

    const deleteClick = () => {
        const res = dispatch(deleteOneGroup(groupId));
        // console.log(res);
        history.push('/groups');
    }

    let sessionLinks;
    let sessionEventLinks;
    if(sessionUser) {
        // setPopup(false);
        if(sessionUser.id === group?.organizerId) {
            sessionLinks = (
                <div className='buttons-side-by-side'>
                <NavLink to={`/groups/${groupId}/edit`} ><button className='group-deets-button'>
                        Edit this group
                </button></NavLink>
                <button onClick={deleteClick} className='group-deets-button'>
                        Delete this group
                </button>
                </div>
            );
            sessionEventLinks = (
                <NavLink to={`/groups/${groupId}/events/new`}>
                    <button className='create-event-button'>Create a new event</button>
                </NavLink>
            );
        }
    //     else {
    //         sessionLinks = (
    //             <button className='group-deets-button'>
    //                     Join this group
    //             </button>
    //         )
    //     }
    // } else {
    //         sessionLinks = null;
                // <>
                //  <span className={popup ? 'signin-popup show' : 'signin-popup'}>You must be signed in to join this group</span>
                //  <div className='group-deets-div' onClick={() => setPopup(!popup)}>
                //      Join this group
                //  </div>
                //  </>
    }

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    return (
        <div className='group-details-container'>
            <div className='top-section-group-details'>
                <div className='group-main-image'
                style={{backgroundImage: `url(${!!group ? group?.previewImage : `https://i.imgur.com/7EYSecN.png`})`}}
                >
                    {/* <img className='group-thumbail' src={`${!!group ? group?.previewImage : `https://i.imgur.com/7EYSecN.png`}`} alt='thumbnail' /> */}
                </div>
                <div className='group-information'>
                    <h2 className='group-deets-name'>{group?.name}</h2>
                    <div className='group-deets location'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={location} alt='location' />
                    </div>
                    <span>
                        {`${group?.city}, ${group?.state}`}
                    </span>
                    </div>
                    <div className='group-deets members'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={members} alt='members' />
                    </div>
                    <span>
                        {`${!!group?.numMembers ? group?.numMembers : 0} ${group?.numMembers > 1 || !group?.numMembers ? 'members' : 'member'} `}  &bull; {group?.type} &bull; {!!group?.private ? 'Private group' : 'Public group'}
                    </span>
                    </div>
                    <div className='group-deets organizer'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={organizer} alt='organizer' />
                    </div>
                    <span>
                        Organized by {group?.organizerName}
                    </span>
                    </div>
                    {sessionLinks}
                    {/* <button className='group-deets-button'>
                        Join this group
                    </button> */}
                </div>
            </div>
            <div className='group-details-bottom'>
                <div className='group-deets-about'>
                    <h2 className='group-deets-title'>
                        What we're about
                    </h2>
                    <p className='group-deets-p'>
                        {group?.about}
                    </p>
                </div>
                <div className='group-deets-events'>
                    <h2 className='group-deets-title group-events-stuffs'>
                        Events<span className='span-between-event-title-link'>{sessionEventLinks}</span>
                    </h2>
                    {!!Object.values(group.events).length ? Object.values(group.events).map((ele, i) => {
                        return (
                            <div key={i} className={i > 0 ? `mini-event-container-in-group` : `mini-top-container-in-group`}>
                                <NavLink key={ele.id} to={`/events/${ele.id}`}>
                                <div className='mini-event-preview-grid'>
                                    <div className='mini-event-preview-image'>
                                        <img className='mini-event-thumbnail' src={`${ele.previewImage}`} alt='thumbnail' />
                                    </div>
                                    <div className='mini-event-preview-info'>
                                        <h3 className='mini-event-date'>{`${ele.startDay}, ${ele.startDate}`} • {ele.startTime}</h3>
                                        <h3 className='mini-event-name'>{ele.name}</h3>
                                        <div className='mini-event-about-container'><p className='event-about'>{ele.groupName} • {ele.groupCity}, {ele.groupState}</p></div>
                                    </div>
                                </div>
                                </NavLink>
                            </div>
                        )
                    }) : (
                        <div className='noevent-container'>
                            <img src={noevents} alt='noevents' />
                            <p className='no-events'>This group has no events</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
