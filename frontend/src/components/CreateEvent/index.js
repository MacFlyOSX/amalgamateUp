import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import './CreateEvent.css';
import { createEvent, getOneEvent } from "../../store/events";
import { getOneGroup } from "../../store/groups";


const CreateEvent = () => {
  const location = useLocation();
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
    const [ time, setTime ] = useState('');
    const [ type, setType ] = useState('');
    const [ date, setDate ] = useState('');
    const [ duration, setDuration ] = useState('');
    const [ previewImage, setPreviewImage ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const [ showPrice, setShowPrice ] = useState(false);
    const [ showCapacity, setShowCapacity ] = useState(false);

    // console.log('this is the current location', location);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (capacity === 0) setCapacity(1000);
        const startDate = `${date} ${time}`;

        const endDate = `${date} ${+time.slice(0,2) + +duration}${time.slice(2)}`;
        const payload = {
          venueId: 1,
          name, type, capacity, price, description, startDate, endDate
        }

        // console.log('this is the payload in create a event', payload);

        const createdEvent = await dispatch(createEvent(payload, groupId, previewImage));

        if(createdEvent) {
            history.push(`/events/${createdEvent.id}`);
        }
    };

    // console.log('this is the time', time);
    // console.log('this is the date', date);

    useEffect(() => {
      dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    return (
      <div className="entire-event-form-container">
      {location.pathname.includes('/events/new') && (
            <style>
            {"\
                html, body{\
                  background-color: #f6f7f8;\
                }\
            "}
            </style>
        )}
            <div className="create-event-form-container">
            <form className='create-event-form' onSubmit={handleSubmit}>
                  <div className="create-event-form-title">
                  <h2 className="create-event-title">Create an Event</h2>
                  <p className="create-event-group-name">
                    {group.name}
                  </p>
                  </div>
                <div className="edit-event-form-stuff">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <label className="create-event-labels">
                    Title<br />
                    <input
                      className="create-form-text-input create-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="create-event-labels">
                    Date<span className="date-time-chunk" />Time<span className="time-duration-chunk" /> Duration<br />
                    <input
                      className="create-form-date-input create-input"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </label>
                  <label className="create-event-labels">
                    <input
                      className="create-form-time-input create-input"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </label>
                  <label className="create-event-labels">
                    <select
                      className="create-form-duration-input create-input"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    >
                      <option disabled value=''>Select duration</option>
                      <option value='1'>1 hour</option>
                      <option value='2'>2 hours</option>
                      <option value='3'>3 hours</option>
                      <option value='4'>4 hours</option>
                      <option value='5'>5 hours</option>
                      <option value='6'>6 hours</option>
                    </select>

                  </label><br />
                  <label className="create-event-labels">
                    Feature Photo<br />
                    <input
                      className="create-form-text-input create-input"
                      placeholder="URL"
                      type="text"
                      value={previewImage}
                      onChange={(e) => setPreviewImage(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="create-event-labels">
                    Description<br />
                    <textarea
                      className="create-form-description-input create-input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="create-event-labels">
                  Type<br />
                    <select
                      className="create-form-type-input create-input"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option disabled value=''>Select a type of event</option>
                      <option value='In person'>In person</option>
                      <option value='Online'>Online</option>
                    </select>

                  </label><br />
                  <div className="create-form-checkbox-div">
                  <label className="create-event-labels create-eventfee">
                    Event fee
                    <input
                      className="create-form-checkbox"
                      type="checkbox"
                      onChange={(e) => setShowPrice(!showPrice)}
                    />
                    {showPrice && (
                      <>
                      <br />
                      $
                      <input className='create-form-price-input create-input'
                      type='number'
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      /></>
                    )}
                  </label><br />
                  <label className="create-event-labels">
                  Attendee limit
                    <input
                      className="create-form-checkbox"
                      type="checkbox"
                      onChange={(e) => setShowCapacity(!showCapacity)}
                    />
                    {showCapacity && (
                      <>
                      <br />
                      <input className='create-form-capacity-input create-input'
                      type='number'
                      min={1}
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      /></>
                    )}
                  </label>
                  </div>
                  <p></p>
                  {/* <button onClick={onPreviewClick} className="editted-event-preview edit-button">
                  Preview Changes
                  </button> */}
                  <button type="submit" className="create-event-button">
                  Publish
                  </button>
                  </div>
                </form>
            </div>
            <div className="tips-for-a-great-event">
              <h3 className="tips-event-title">Tips for a great event</h3>
              <p className="tip-small-titles">
                Be descriptive
              </p>
              <p className="tip-small-under">
                A good title immediately gives people an idea of what the event is about.
              </p>
              <p className="tip-small-titles">
                Get organized
              </p>
              <p className="tip-small-under">
                Describe things in a clear order so it's easy to digest. Start with an overall
                description of the event and include a basic agenda, before you move into really
                specific details.
              </p>
              <p className="tip-small-titles">
                Add a great feature image
              </p>
              <p className="tip-small-under">
                Upload a great photo to give members a better feel for the event.
              </p>
            </div>
      </div>
    )
}
export default CreateEvent;
