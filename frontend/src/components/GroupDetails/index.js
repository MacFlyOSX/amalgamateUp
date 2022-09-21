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


const GroupDetails = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { groupId } = useParams();
    const dispatch = useDispatch();
    console.log('this is the groupId that I think is boofed', groupId);
    // const [popup, setPopup] = useState(false);

    const group = useSelector(state => state.groups.singleGroup);
    console.log('this is the group', group);

    const deleteClick = () => {
        const res = dispatch(deleteOneGroup(groupId));
        console.log(res);
        history.push('/groups');
    }

    let sessionLinks;
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
            )
        } else {
            sessionLinks = (
                <button className='group-deets-button'>
                        Join this group
                </button>
            )
        }
    } else {
            sessionLinks = null;
                <>
                 {/* <span className={popup ? 'signin-popup show' : 'signin-popup'}>You must be signed in to join this group</span>
                 <div className='group-deets-div' onClick={() => setPopup(!popup)}>
                     Join this group
                 </div> */}
                 </>
    }

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    return (
        <div className='group-details-container'>
            <div className='top-section-group-details'>
                <div className='group-main-image' style={{backgroundImage: `url(${group?.previewImage})`}}>
                    {/* <img class='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
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
                        {`${!!group?.numMembers ? group?.numMembers : 0} ${group?.numMembers > 1 || !group?.numMembers ? 'members' : 'member'} `} 	&middot; {!!group?.private ? 'Private group' : 'Public group'}
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
                    <h2 className='group-deets-title'>
                        Events
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
