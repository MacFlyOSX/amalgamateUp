import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './CreateEvent.css';
import { createEvent, getOneEvent } from "../../store/events";
import { getOneGroup } from "../../store/groups";
import clock from '../../icons/clock.png';
import eventLoc from '../../icons/eventLoc.png';


const CreateEvent = () => {
  const {groupId} = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push(`/events`);
    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.singleGroup);

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ capacity, setCapacity ] = useState(0);
    const [ price, setPrice ] = useState(0);
    const [ type, setType ] = useState('');
    const [ state, setState ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ previewImage, setPreviewImage ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const payload = {
        //     name, description, type: 'In person', private: privacy, city, state
        // };
        // console.log('this is the payload in create a event', payload);

        // const createdEvent = await dispatch(createEvent(payload, previewImage));

        // if(createdEvent) {
        //     history.push(`/events/${createdEvent.id}`);
        // }
    };

    useEffect(() => {
      dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    return (
            <div className="edit-event-form-container">
            <form className='create-event-form' onSubmit={handleSubmit}>
                <div className="edit-event-form-top">
                  <div className="edit-event-form-title">Create an Event</div>
                  {/* <div className="edit-event-form-top-member">Already a member? Log in</div> */}
                </div>
                <div className="edit-event-form-stuff">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <label>
                    Event Name<br />
                    <input
                      className="event-form-input edit-event-name eg-form"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="event-form-city">
                    Price<span className="price-capacity-chunk"> </span>Capacity<span className="capacity-type-chunk"> </span>Type<br />
                    <input
                      className="event-input-price eg-form"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </label>
                  <label className="event-form-state">
                    <input
                      className="event-input-capacity eg-form"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </label>
                  <label className="event-form-state">
                    <select
                      className="event-input-type eg-form"
                      id='event-type'
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option disabled value=''>Select an event type</option>
                      <option value='In person'>In person</option>
                      <option value='Online'>Online</option>
                    </select>

                  </label><br />
                  <label>
                    Preview Image URL<br />
                    <input
                      className="event-form-input edit-event-name eg-form"
                      type="text"
                      value={previewImage}
                      onChange={(e) => setPreviewImage(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="edit-event-about">
                    About:<br />
                    <p className="what-we-about">
                    1. What's the purpose of the event?
                    </p>
                    <p className="what-we-about">
                    2. Who should join?
                    </p>
                    <p className="what-we-about">
                    3. What will you do at your events?
                    </p>
                    <textarea
                      placeholder={`Here's an example:

"This is a event for anyone interested in hiking, rock climbing, camping, kayaking, bouldering, etc. All skill levels are welcome. I started this event to meet other outdoor enthusiasts. Looking forward to exploring the outdoors with everybody."`}
                      className="edit-event-textarea event-form-input eg-form"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </label>
                  <p></p>
                  {/* <button onClick={onPreviewClick} className="editted-event-preview edit-button">
                  Preview Changes
                  </button> */}
                  <button type="submit" className="edit-submit-button edit-button">
                  Create Event
                  </button>
                  </div>
                </form>
            </div>
    )
}
export default CreateEvent;
