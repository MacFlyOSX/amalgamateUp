import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './CreateGroup.css';
import { createGroup } from "../../store/groups";


const CreateGroup = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();
    if (!sessionUser) history.push(`/groups`);
    const dispatch = useDispatch();

    const [ about, setAbout ] = useState('');
    const [ privacy, setPrivacy ] = useState(false);
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');

    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('');
    const [ previewImage, setPreviewImage ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);

    const validate = () => {
      const validationErrors = [];

      if (name.length < 10) validationErrors.push('Group title must be at least 10 characters');

      if(about.length < 50) validationErrors.push('Group description must be at least 50 characters');

      return validationErrors;
    }

    function isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();

        if(errors.length > 0) return setValidationErrors(errors);

        const payload = {
            name, about, type, private: privacy, city, state
        };
        // console.log('this is the payload in create a group', payload);

        if (!isImage(previewImage)) setPreviewImage('https://i.imgur.com/7EYSecN.png');

        const createdGroup = await dispatch(createGroup(payload, previewImage));

        if(createdGroup) {
            history.push(`/groups/${createdGroup.id}`);
        }
    };

    return (
      <div className="entire-event-form-container">
      {location.pathname.includes('/groups/new') && (
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
                  <h2 className="create-event-title">Create a Group</h2>
                  <p className="create-event-group-name">
                  You don’t have to be an expert to gather people together and explore shared interests.
                  </p>
                  </div>
                <div className="edit-event-form-stuff">
                {/* <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul> */}
                  <label className="create-event-labels">
                    Name<br />
                    <input
                      className="create-form-text-input create-input"
                      maxLength={80}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="create-event-labels">
                    City<span className="city-state-chunk" />State<br />
                    <input
                      className="create-form-city-input create-input"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </label>
                  <label className="create-event-labels">
                    <select
                      className="create-form-state-input create-input"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option disabled value=''>Select a state</option>
                      <option value='AL'>AL</option>
                      <option value='AK'>AK</option>
                      <option value='AR'>AR</option>
                      <option value='AZ'>AZ</option>
                      <option value='CA'>CA</option>
                      <option value='CO'>CO</option>
                      <option value='CT'>CT</option>
                      <option value='DE'>DE</option>
                      <option value='DC'>DC</option>
                      <option value='FL'>FL</option>
                      <option value='GA'>GA</option>
                      <option value='HI'>HI</option>
                      <option value='IA'>IA</option>
                      <option value='ID'>ID</option>
                      <option value='IL'>IL</option>
                      <option value='IN'>IN</option>
                      <option value='KS'>KS</option>
                      <option value='KY'>KY</option>
                      <option value='LA'>LA</option>
                      <option value='MA'>MA</option>
                      <option value='MD'>MD</option>
                      <option value='ME'>ME</option>
                      <option value='MI'>MI</option>
                      <option value='MN'>MN</option>
                      <option value='MO'>MO</option>
                      <option value='MS'>MS</option>
                      <option value='MT'>MT</option>
                      <option value='NC'>NC</option>
                      <option value='ND'>ND</option>
                      <option value='NE'>NE</option>
                      <option value='NH'>NH</option>
                      <option value='NJ'>NJ</option>
                      <option value='NM'>NM</option>
                      <option value='NV'>NV</option>
                      <option value='NY'>NY</option>
                      <option value='OH'>OH</option>
                      <option value='OK'>OK</option>
                      <option value='OR'>OR</option>
                      <option value='PA'>PA</option>
                      <option value='RI'>RI</option>
                      <option value='SC'>SC</option>
                      <option value='SD'>SD</option>
                      <option value='TN'>TN</option>
                      <option value='TX'>TX</option>
                      <option value='UT'>UT</option>
                      <option value='VA'>VA</option>
                      <option value='VT'>VT</option>
                      <option value='WA'>WA</option>
                      <option value='WI'>WI</option>
                      <option value='WV'>WV</option>
                      <option value='WY'>WY</option>
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
                    About<br />
                    <textarea
                      className="create-form-description-input create-input"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
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
                      <option disabled value=''>Select a type of group</option>
                      <option value='In person'>In person</option>
                      <option value='Online'>Online</option>
                    </select>

                  </label><br />
                  <div className="create-form-checkbox-div">
                  <label className="create-event-labels create-eventfee">
                    Private Group
                    <input
                      className="create-form-checkbox"
                      type="checkbox"
                      onChange={() => setPrivacy(!privacy)}
                    />
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
                  </div>
                </form>
            </div>
            <div className="tips-for-a-great-event">
              <h3 className="tips-event-title">Tips for a great group</h3>
              <p className="tip-small-titles">
                Be descriptive
              </p>
              <p className="tip-small-under">
              Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.
              </p>
              <p className="tip-small-titles">
                Describe what your group will be about
              </p>
              <p className="tip-small-under">
<p className="group-numbers">1.	What's the purpose of the group?</p>
<p className="group-numbers">2.	Who should join?</p>
<p className="group-numbers">3.	What will you do at your events?</p>

              </p>
              <p className="tip-small-titles">
                Add a great feature image
              </p>
              <p className="tip-small-under">
                Upload a great photo to give members a better feel for the group.
              </p>
            </div>
      </div>
    )
}
export default CreateGroup;
