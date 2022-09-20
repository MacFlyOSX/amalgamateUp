import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup } from '../../store/groups';
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './GroupDetails.css';


const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();

    const group = useSelector(state => state.groups[groupId]);

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    if(!group) return null;
    console.log(group);

    return (
        <div className='group-details-container'>
            <div className='top-section-group-details'>
                <div className='group-main-image' style={{backgroundImage: `url(${group.previewImage})`}}>
                    {/* <img class='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
                </div>
                <div className='group-information'>
                    <h2 className='group-deets-name'>{group.name}</h2>
                    <div className='group-deets location'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={location} alt='location' />
                    </div>
                    <span>
                        {`${group.city}, ${group.state}`}
                    </span>
                    </div>
                    <div className='group-deets members'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={members} alt='members' />
                    </div>
                    <span>
                        {`${!!group.numMembers ? group.numMembers : 0} ${group.numMembers > 1 || !group.numMembers ? 'members' : 'member'} `} 	&middot; {!!group.private ? 'Private group' : 'Public group'}
                    </span>
                    </div>
                    <div className='group-deets organizer'>
                    <div className='chunk'>
                        <img className='group-deets-icon' src={organizer} alt='organizer' />
                    </div>
                    <span>
                        Organized by {group.organizerName}
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
