import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneGroup } from '../../store/groups';
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './EditGroup.css';
import { updateGroup } from "../../store/groups";


const EditGroup = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { groupId } = useParams();
    const dispatch = useDispatch();

    // console.log('this is the groupId from editGroup', groupId);

    const group = useSelector(state => state.groups.singleGroup);

    const [ name, setName ] = useState(group?.name);
    const [ about, setAbout ] = useState(group?.about);
    const [ privacy, setPrivacy ] = useState(group?.private);
    const [ type, setType ] = useState(group?.type);
    const [ city, setCity ] = useState(group?.city);
    const [ state, setState ] = useState(group?.state);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ charLimit, setCharLimit ] = useState(600);

    const validate = () => {
      const validationErrors = [];

      if (name.length < 10) validationErrors.push('Group title must be at least 10 characters');

      if(about.length < 50) validationErrors.push('Group description must be at least 50 characters');

      return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();

        if(errors.length > 0) return setValidationErrors(errors);

        const payload = {
            id: groupId, name, about, type: 'In person', private: privacy, city, state
        };
        // console.log('this is the payload in edit group', payload);

        const updatedGroup = await dispatch(updateGroup(payload));

        if(updatedGroup) {
            history.push(`/groups/${groupId}`);
        }
    };

      if (!sessionUser) history.push(`/groups/${groupId}`);
      else if (sessionUser.id !== group.organizerId) history.push(`/groups/${groupId}`);

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    useEffect(() => {
      setCharLimit(600-about.length);
    }, [about]);

    return (
        <div className="edit-group-container">
            <div className='edit-group-details-container'>
            <div className="edit-group-preview-title">Group Preview</div>
            <div className='edit-top-section-group-details'>
                <div className='edit-group-main-image' style={{backgroundImage: `url(${group?.previewImage})`}}>
                    {/* <img className='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
                </div>
                <div className='edit-group-information'>
                    <h2 className='edit-group-deets-name'>{name}</h2>
                    <div className='edit-group-deets location'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={location} alt='location' />
                    </div>
                    <span className="edit-group-span">
                        {`${city}, ${state}`}
                    </span>
                    </div>
                    <div className='edit-group-deets members'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={members} alt='members' />
                    </div>
                    <span className="edit-group-span">
                        {`${!!group?.numMembers ? group?.numMembers : 0} ${group?.numMembers > 1 || !group?.numMembers ? 'members' : 'member'} `} 	&bull;  {group?.type} &bull; {privacy ? 'Private group' : 'Public group'}
                    </span>
                    </div>
                    <div className='edit-group-deets organizer'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={organizer} alt='organizer' />
                    </div>
                    <span className="edit-group-span">
                        Organized by {group?.organizerName}
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
            <form onSubmit={handleSubmit}>
                <div className="edit-group-form-top">
                  <div className="edit-group-form-title">Edit Group</div>
                </div>
                <div className="edit-group-form-stuff">
                  <label className="group-form-label">
                    Group Name<br />
                    <input
                      className="group-form-input edit-group-name eg-form"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label><br />
                  <label className="group-form-label">
                    City<span className="city-state-chunker"> </span>State<br />
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
                  <label className="flex-label group-form-label">
                    Group Type<span className='edit-group-privacy'>Private Group?</span>
                    <input
                      className="private-checkbox eg-form"
                      type="checkbox"
                      value={privacy}
                      checked={!!privacy ? true : false}
                      onChange={(e) => setPrivacy(!privacy)}
                    />
                  </label>
                  <select className="edit-group-type eg-form"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  >
                    <option value='In person'>
                      In person
                    </option>
                    <option value='Online'>
                      Online
                    </option>
                  </select><br />
                  <label className="edit-group-about group-form-label">
                    About<span className="about-edit-gap">{charLimit} characters left</span><br />
                    <textarea
                      className="edit-group-textarea group-form-input eg-form"
                      maxLength='600'
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                    />
                  </label>
                  <p></p>
                  {validationErrors.length > 0 && (
                      <div className='errors'>
                        Please fix the following errors:
                        <ul className="errors-list">
                          {validationErrors.map(error => <li className="error" key={error}>&gt; {error}</li>)}
                        </ul>
                      </div>
                    )}
                  <button type="submit" className="edit-submit-button edit-button">
                  Update Group
                  </button>
                  </div>
                </form>
            </div>
        </div>
    )
}
export default EditGroup;
