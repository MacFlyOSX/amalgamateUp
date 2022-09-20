import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events';
import './EventsBrowser.css';

const EventsIndex = () => {
    const dispatch = useDispatch();
    const eventObj = useSelector(state => state.events);
    console.log('this is the events received in EventsIndex', eventObj);
    const events = Object.values(eventObj);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    if (!events) return null;

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
            <div className='main-events'>
                <nav>
                    {events.map((event, i) => {
                        console.log(event)
                        return (
                            <div className={i === 0 ? 'fun-town' : 'event-container'}>
                            <NavLink key={event.id} to={`/events/${event.id}`}>
                            <div className='event-preview-grid'>
                                <div className='event-preview-image'>
                                    <img class='thumbnail' src={`${event.previewImage}`} alt='thumbnail' />
                                </div>
                                <div className='event-preview-info'>
                                    {/* <h3 className='event-date'>{`${event.startDate.day}, ${event.startDate.date}`} &middot; {event.startDate.time}</h3> */}
                                    <h3 className='event-name'>{event.name}</h3>
                                </div>
                            </div>
                                <div className='nav-image' style={{backgroundImage: `url('${event.previewImage}')`}}></div>
                                <div>
                                    <div className='primary-text'>{event.name}</div>
                                    <div className='secondary-text'>
                                        {event.type} {event.about}
                                    </div>
                                </div>
                            </NavLink>
                            <hr></hr>
                            </div>
                        )
                    })}
                </nav>
            </div>
        </main>
    )
}

export default EventsIndex;
