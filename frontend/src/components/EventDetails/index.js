import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEvent } from '../../store/events';
import eventLoc from '../../icons/eventLoc.png';
import clock from '../../icons/clock.png';
import organizer from '../../icons/organizer.png';
import './EventDetails.css';
import { deleteOneEvent } from '../../store/events';
import { NavLink } from 'react-router-dom';
import dollar from '../../icons/dollar.svg';
import people from '../../icons/people.svg';


const EventDetails = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log('this is the location eventDetails', location)

    const event = useSelector(state => state.events.singleEvent);
    // console.log('this is the event', event);

    const deleteClick = async () => {
        const res = await dispatch(deleteOneEvent(eventId));
        // console.log(res);
        history.push('/events');
    }

    let sessionLinks;
    if(sessionUser) {
        // setPopup(false);
        if(sessionUser.id === event?.hostId) {
            sessionLinks = (
                <>
                <button onClick={deleteClick} className='event-deets-button'>
                        Delete this event
                </button>
                </>
            )
        }
    }

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);

    return (
        <div className='event-deets-bg'>
        {location.pathname.includes('/events/') && (
            <style>
            {"\
                html, body{\
                  background-color: #f6f7f8;\
                }\
            "}
            </style>
        )}
        {/* <div className='event-entire-container'> */}
            <div className='event-details-top-title-container'>
                <div className='event-top-title-stuffs'>
                    <h3 className='event-details-date'>{`${event.startDay}, ${event.startDate}`}</h3>
                    <h1 className='event-details-name-title'>{event.name}</h1>
                    <div className='event-host-container'>
                        <img className='event-host-icon' src={organizer} alt='organizer' />
                        <div className='event-host-info'>
                            <p className='event-hosted-by host-stuff'>Hosted By</p>
                            <p className='event-host host-stuff'>{event?.Host}</p>
                        </div>
                        <div className='event-delete-button-div'>
                        {sessionLinks}
                        </div>
                    </div>
                </div>
            </div>
        <div className='event-details-container'>
            <div className='top-section-event-details'>
                <div className='event-main-image'
                style={{backgroundImage: `url(${!!event ? event?.previewImage : `https://i.imgur.com/7EYSecN.png`})`}}
                >
                    {/* <img className='event-thumbail' src={`${!!event ? event?.previewImage : `https://i.imgur.com/7EYSecN.png`}`} alt='thumbnail' /> */}
                </div>
                <div className='event-information'>
                    <div className='event-deets-group-info'>
                    <NavLink to={`/groups/${event.groupId}`} >
                    <div className='event-group-container'>
                        <img className='event-group-thumbnail' src={event.groupPreviewImage} alt='organizer' />
                        <div className='event-group-info'>
                            <p className='event-group-name group-stuff'>{event?.Group?.name}</p>
                            <p className='event-group-privacy group-stuff'>{!!event?.Group?.private ? 'Private group' : 'Public group'}</p>
                        </div>
                    </div>
                    </NavLink>
                    </div>
                    <div className='event-timeplace-container'>
                        <div className='event-time-div'>
                        <img className='event-time-clock timeplace-icon' src={clock} alt='clock' />
                        <div className='event-time-info'>
                            <p className='event-time-from-this-to-this'>
                                {`${event.startDay}, ${event.startDate} at ${event.startTime} to ${event.endDay}, ${event.endDate} at ${event.endTime}`}
                            </p>
                        </div>
                        </div>
                        <div className='event-location-div'>
                            <img className='event-place-location timeplace-icon' src={eventLoc} alt='location' />
                            <div className='event-time-info'>
                                <p className='event-place-addy'>
                                    {event?.Venue?.address} &bull;
                                    {` ${event?.Venue?.city}, ${event?.Venue?.state}`}
                                </p>
                            </div>
                        </div>
                        <div className='event-location-div'>
                            <img className='event-place-location timeplace-icon' src={dollar} alt='dollar' />
                            <div className='event-time-info'>
                                <p className='event-place-addy'>
                                    {event?.price ? `$${event?.price}` : 'FREE'}
                                </p>
                            </div>
                        </div>
                        <div className='event-location-div'>
                            <img className='event-place-location timeplace-icon' src={people} alt='dollar' />
                            <div className='event-time-info'>
                                <p className='event-place-addy'>
                                    {event?.capacity} member capacity
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='event-details-bottom'>
                <div className='event-deets-details'>
                    <h2 className='event-deets-title'>
                        Details
                    </h2>
                    <p className='event-deets-p'>
                        {event?.description}
                    </p>
                </div>
            </div>
        </div>
        {/* </div> */}
        </div>
    )
}

export default EventDetails;
