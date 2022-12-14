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
import { addAttendance, getAttendees } from '../../store/attendees';
import userImage2 from '../../icons/userImage2.svg';

const EventDetails = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const attendeeList = useSelector(state => state.attendance.single.attendees);
    const realAttendees = Object.values(attendeeList);
    const pendingList = useSelector(state => state.attendance.single.pending);
    const isPending = pendingList.userId;
    // console.log('this is the location eventDetails', location)
    // let pending = [];
    // let isPending = [];
    // if (pendingList[eventId]) {
    //     pending = Object.values(pendingList?.[eventId]);
    //     isPending = pending.filter(ele => ele.userId === sessionUser.id);
    // }
    const isAttendee = sessionUser ? realAttendees.filter(ele => ele.userId === sessionUser.id).length : null;

    const event = useSelector(state => state.events.singleEvent);
    // console.log('this is the event', event);

    const deleteClick = async () => {
        const res = await dispatch(deleteOneEvent(eventId));
        // console.log(res);
        history.push('/events');
    }

    const attendEvent = async () => {
        const result = await dispatch(addAttendance({
            eventId,
            userId: sessionUser.id,
            status: 'pending'
        }));
        if(result) {
            history.push(`/events/${eventId}`);
        }
    }

    let sessionLinks;
    if(sessionUser) {
        if(sessionUser.id === event?.hostId) {
            sessionLinks = (
                <>
                <button onClick={deleteClick} className='event-deets-button'>
                        Delete this event
                </button>
                </>
            )
        } else {
            if (isPending) {
                sessionLinks = (
                    <button className='greyed-out-button'>
                        <em>Attendance pending...</em>
                    </button>
                )
            }
            else if (+event?.capacity === +event?.numAttending) {
                sessionLinks = (
                    <>
                    <button className='greyed-out-button'>
                            <em>Capacity reached</em>
                    </button>
                    </>
                )
            }
            // else if (!isAttendee) {
            //     sessionLinks = (
            //         <button onClick={() => attendEvent()} className='group-deets-button'>
            //                 Attend this event
            //         </button>
            //     )
            // }
        }
    }

    useEffect(() => {
        dispatch(getOneEvent(eventId));
        dispatch(getAttendees(eventId));

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
                    <h3 className='event-details-date'>{`${event.startDay}, ${event.startMD}`}</h3>
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
                <div className='event-main-image'>
                    <img className='event-thumbnail' src={`${!!event ? event?.previewImage : `https://i.imgur.com/TXRPT7m.png`}`} alt='thumbnail' onError={e => e.currentTarget.src = 'https://i.imgur.com/TXRPT7m.png'} />
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
                                {`${event.startDay}, ${event.startMD} at ${event.startTime} to ${event.endDay}, ${event.endMD} at ${event.endTime}`}
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
                                    {event?.price ? `$${(event.price)}` : 'FREE'}
                                </p>
                            </div>
                        </div>
                        <div className='event-location-div'>
                            <img className='event-place-location timeplace-icon' src={people} alt='dollar' />
                            <div className='event-time-info'>
                                <p className='event-place-addy'>
                                    {event?.capacity ? event?.capacity : '150'} capacity &bull; {`${event?.numAttending} ${event?.numAttending > 1 ? 'attendees' : 'attendee'}`}
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
                </div><span></span>
                <div className='container-for-attendees'>
                        <h2 className='group-deets-title'>
                            Attendees
                        </h2>
                        <div className='event-deets-attendee-grid'>
                            {realAttendees.map((attendee, i) => {
                                return (
                                    <div key={i} className='indiv-member'>
                                        <img className='user-image-icon' src={userImage2} alt='user' />
                                        <span className='user-name'>{attendee.firstName}</span>
                                        <span className='user-name'>{attendee.lastName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
            </div>
        </div>
        {/* </div> */}
        </div>
    )
}

export default EventDetails;
