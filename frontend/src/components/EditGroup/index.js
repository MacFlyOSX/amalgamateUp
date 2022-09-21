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

    const group = useSelector(state => state.groups.singleGroup);
    const {id} = group;

    const [ name, setName ] = useState(group?.name);
    const [ about, setAbout ] = useState(group?.about);
    const [ privacy, setPrivacy ] = useState(group?.private);
    const [ city, setCity ] = useState(group?.city);
    const [ state, setState ] = useState(group?.state);
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id, name, about, type: 'In person', private: privacy, city, state
        };
        console.log('this is the payload in edit group', payload);

        const updatedGroup = await dispatch(updateGroup(payload));

        if(updatedGroup) {
            history.push(`/groups/${id}`);
        }
    };

      if (!sessionUser) history.push(`/groups/${id}`);
      else if (sessionUser.id !== group.organizerId) history.push(`/groups/${id}`);

    useEffect(() => {
        dispatch(getOneGroup(id));
    }, [dispatch, id]);

    return (
        <div className="edit-group-container">
            <div className='edit-group-details-container'>
            <div className="edit-group-preview-title">Group Preview</div>
            <div className='edit-top-section-group-details'>
                <div className='edit-group-main-image' style={{backgroundImage: `url(${group?.previewImage})`}}>
                    {/* <img class='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
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
                        {`${!!group?.numMembers ? group?.numMembers : 0} ${group?.numMembers > 1 || !group?.numMembers ? 'members' : 'member'} `} 	&middot; {privacy ? 'Private group' : 'Public group'}
                    </span>
                    </div>
                    <div className='edit-group-deets organizer'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={organizer} alt='organizer' />
                    </div>
                    <span>
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
                    About<br />
                    <textarea
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
                  Update Group
                  </button>
                  </div>
                </form>
            </div>
        </div>
    )
}
export default EditGroup;
