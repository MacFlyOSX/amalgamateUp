import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './CreateGroup.css';
import { createGroup } from "../../store/groups";


const CreateGroup = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push(`/groups`);
    const dispatch = useDispatch();

    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ privacy, setPrivacy ] = useState(false);
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ previewImage, setPreviewImage ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name, about, type: 'In person', private: privacy, city, state
        };
        console.log('this is the payload in create a group', payload);

        const createdGroup = await dispatch(createGroup(payload, previewImage));

        if(createdGroup) {
            history.push(`/groups/${createdGroup.id}`);
        }
    };

    return (
        <div className="edit-group-container">
            <div className='edit-group-details-container'>
            <div className="edit-group-preview-title">Group Preview</div>
            <div className='edit-top-section-group-details'>
                <div className='edit-group-main-image' style={{backgroundImage: `url(https://i.imgur.com/7EYSecN.png)`}}>
                    {/* <img className='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
                </div>
                <div className='edit-group-information'>
                    <h2 className='edit-group-deets-name'>{name}</h2>
                    <div className='edit-group-deets location'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={location} alt='location' />
                    </div>
                    <span>
                        {`${city}, ${state}`}
                    </span>
                    </div>
                    <div className='edit-group-deets members'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={members} alt='members' />
                    </div>
                    <span>
                        {`0 members`} 	&middot; {privacy ? 'Private group' : 'Public group'}
                    </span>
                    </div>
                    <div className='edit-group-deets organizer'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={organizer} alt='organizer' />
                    </div>
                    <span>
                        Organized by {`${sessionUser.firstName} ${sessionUser.lastName}`}
                    </span>
                    </div>
                </div>
            </div>
            <div className='edit-group-details-bottom'>
                    <h2 className='edit-group-deets-title'>
                        What we're about
                    </h2>
                    <p className='edit-group-deets-p'>
                        {about}
                    </p>
                </div>
            </div>
            <div className="edit-group-form-container">
            <form className='create-group-form' onSubmit={handleSubmit}>
                <div className="edit-group-form-top">
                  <div className="edit-group-form-title">Create a Group</div>
                  {/* <div className="edit-group-form-top-member">Already a member? Log in</div> */}
                </div>
                <div className="edit-group-form-stuff">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <label>
                    Group Name<br />
                    <input
                      className="group-form-input edit-group-name eg-form"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="group-form-city">
                    City<span className="city-state-chunk"> </span>State<br />
                    <input
                      className="group-input-city eg-form"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </label>
                  <label className="group-form-state">
                    <input
                      className="group-input-state eg-form"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </label><br />
                  <label>
                    Preview Image URL<br />
                    <input
                      className="group-form-input edit-group-name eg-form"
                      type="text"
                      value={previewImage}
                      onChange={(e) => setPreviewImage(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="flex-label">
                    Private Group?
                    <input
                      className="private-checkbox eg-form"
                      type="checkbox"
                      value={privacy}
                      checked={!!privacy ? true : false}
                      onChange={(e) => setPrivacy(!privacy)}
                    />
                  </label><br />
                  <label className="edit-group-about">
                    About:<br />
                    <p className="what-we-about">
                    1. What's the purpose of the group?
                    </p>
                    <p className="what-we-about">
                    2. Who should join?
                    </p>
                    <p className="what-we-about">
                    3. What will you do at your events?
                    </p>
                    <textarea
                      placeholder={`Here's an example:

"This is a group for anyone interested in hiking, rock climbing, camping, kayaking, bouldering, etc. All skill levels are welcome. I started this group to meet other outdoor enthusiasts. Looking forward to exploring the outdoors with everybody."`}
                      className="edit-group-textarea group-form-input eg-form"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                    />
                  </label>
                  <p></p>
                  {/* <button onClick={onPreviewClick} className="editted-group-preview edit-button">
                  Preview Changes
                  </button> */}
                  <button type="submit" className="edit-submit-button edit-button">
                  Create Group
                  </button>
                  </div>
                </form>
            </div>
        </div>
    )
}
export default CreateGroup;
