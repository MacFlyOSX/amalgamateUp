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
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ showPrice, setShowPrice ] = useState(false);
    const [ showCapacity, setShowCapacity ] = useState(false);
    const [ charLimit, setCharLimit ] = useState(600);
    // console.log('this is the current location', location);
    useEffect(() => {
      setCharLimit(600-description.length);
    }, [description]);
    const [ nameLimit, setNameLimit ] = useState(50);
    useEffect(() => {
      setNameLimit(50-name.length);
    }, [name]);
  // function isImage(url) {
  //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  // }

  console.log('this is the date',date);
  console.log('this is the time',time);

  const validate = () => {
    const validationErrors = [];

    if (name.length < 10) validationErrors.push('Event title must be at least 10 characters');

    if (new Date() > new Date(`${date} ${time}`)) validationErrors.push('Please select a valid date');

    if(description.length < 50) validationErrors.push('Event description must be at least 50 characters');

    if (!previewImage.match(/\.(jpg|jpeg|png)$/)) validationErrors.push('Please enter a valid image URL');

    if (previewImage.length > 255) validationErrors.push('Please enter a shorter image URL');

    return validationErrors;
  }

  const onCancel = () => {
    history.push(`/groups/${groupId}`);
  }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();

        if(errors.length > 0) return setValidationErrors(errors);

        if (capacity === 0) setCapacity(1000);

        // const startToEnd = (numHrs, start) => {
        //   const endDate = new Date(start.getTime());

        //   endDate.setTime(endDate.getTime() + numHrs * 60 * 60 * 1000);

        //   return endDate;
        // }

        // const startDate = new Date(`${date} ${time}`);
        const startDate = `${date} ${time}`;

        let tempTime = time.split(':');
        let hour;
        switch (tempTime[0]) {
          case '00':
            hour = 0;
            break;
          case '01':
            hour = 1;
            break;
          case '02':
            hour = 2;
            break;
          case '03':
            hour = 3;
            break;
          case '04':
            hour = 4;
            break;
          case '05':
            hour = 5;
            break;
          case '06':
            hour = 6;
            break;
          case '07':
            hour = 7;
            break;
          case '08':
            hour = 8;
            break;
          case '09':
            hour = 9;
            break;
          default:
            hour = +tempTime[0];
        }
        console.log('this is the hour after the switch case', hour);
        hour += +duration;
        console.log('this is the hour after the += duration', hour);
        console.log('this is the hour', hour);
        let min = tempTime[1];
        console.log('this is the min', min);
        let tempDate = date.split('-');
        let year = +tempDate[0];
        console.log('this is the year', year);
        let month = tempDate[1];
        console.log('this is the month', month);
        let day = tempDate[2];
        console.log('this is the day', day);
        let longMonths = ['01', '03', '05', '07', '08', '10'];
        let shortMonths = ['04', '06', '09', '11'];
        if (hour >= 24) {
          day = +day + 1;
          hour -= 24;
          if (day > 31 && longMonths.includes(month)) {
            month++;
            day -= 31;
          } else if (day > 30 && shortMonths.includes(month)) {
            month++;
            day -= 30;
          } else if (day > 28 && month === '02') {
            month++;
            day -=28;
          } else if (day > 31 && month === '12') {
            month = '01';
            day -=31;
            year++;
          }
        }
        hour = `${hour}`;

        const endDate = `${year}-${month}-${day} ${hour.padStart(2, '0')}:${min}`;

        console.log('this is the startDate',startDate);
        console.log('this is the endDate',endDate);
        // const endDate = startToEnd(duration, startDate)
        // const endDate = `${date} ${+time.slice(0,2) + +duration}${time.slice(2)}`;
        const payload = {
          venueId: 1,
          name, type, capacity, price, description, startDate, endDate
        }

        // console.log('this is the payload in create a event', payload);
        // if (!isImage(previewImage)) setPreviewImage('https://i.imgur.com/qfX30Dz.png');

        const createdEvent = await dispatch(createEvent(payload, groupId, previewImage, sessionUser.id));

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
                {/* <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul> */}
                  <label className="create-event-labels">
                    Title<span className={nameLimit > 99 ? "title-gap" : nameLimit > 9 ? 'title-tens-gap' : nameLimit === 1 ? 'title-one-gap' : nameLimit === 0 ? 'title-ones-gap zero' : 'title-ones-gap'}>{nameLimit} {nameLimit === 1 ? 'character' : 'characters'} left</span>
                    <input
                      className="create-form-text-input create-input"
                      maxLength='50'
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
                      <option value='7'>7 hour</option>
                      <option value='8'>8 hours</option>
                      <option value='9'>9 hours</option>
                      <option value='10'>10 hours</option>
                      <option value='11'>11 hours</option>
                      <option value='12'>12 hours</option>
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
                    Description<span className={charLimit > 99 ? "description-gap" : charLimit > 9 ? 'description-tens-gap' : charLimit === 1 ? 'description-one-gap' : charLimit === 0 ? 'description-ones-gap zero' : 'description-ones-gap'}>{charLimit} {charLimit === 1 ? 'character' : 'characters'} left</span><br />
                    <textarea
                      className="create-form-description-input create-input"
                      maxLength='600'
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
                      min={2}
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      /></>
                    )}
                  </label>
                  </div>
                  <p></p>
                  {validationErrors.length > 0 && (
                      <div className='errors'>
                        Please fix the following errors:
                        <ul className="errors-list">
                          {validationErrors.map(error => <li className="error" key={error}>&gt; {error}</li>)}
                        </ul>
                      </div>
                    )}
                  <button type="submit" className="create-event-button">
                  Publish
                  </button>
                  <button className="cancel-create-group cancel-button"
                  onClick={onCancel}>Cancel</button>
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
