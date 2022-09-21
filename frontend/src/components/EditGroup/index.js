import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneGroup } from '../../store/groups';
import location from '../../icons/location.png';
import members from '../../icons/members.png';
import organizer from '../../icons/organizer.png';
import './EditGroup.css';


const EditGroup = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { groupId } = useParams();
    const dispatch = useDispatch();

    const group = useSelector(state => state.groups.singleGroup);

    const [ name, setName ] = useState(group?.name);
    const [ about, setAbout ] = useState(group?.about);
    const [ privacy, setPrivacy ] = useState(group?.private);
    const [ city, setCity ] = useState(group?.city);
    const [ state, setState ] = useState(group?.state);
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
        //   setErrors([]);
        //   return dispatch(sessionActions.edit-group({ firstName, lastName, email, username: `${firstName}${lastName[0]}`, password }))
        //     .catch(async (res) => {
        //       const data = await res.json();
        //       if (data && data.errors) setErrors(data.errors);
        //     });
        // }
        // return setErrors(['Confirm Password field must be the same as the Password field']);
      };

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    return (
        <div className="edit-group-container">
            <div className='edit-group-details-container'>
            <div className='edit-top-section-group-details'>
                <div className='edit-group-main-image' style={{backgroundImage: `url(${group?.previewImage})`}}>
                    {/* <img class='group-thumbail' src={`${group.previewImage}`} alt='thumbnail' /> */}
                </div>
                <div className='edit-group-information'>
                    <h2 className='edit-group-deets-name'>{group?.name}</h2>
                    <div className='edit-group-deets location'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={location} alt='location' />
                    </div>
                    <span>
                        {`${group?.city}, ${group?.state}`}
                    </span>
                    </div>
                    <div className='edit-group-deets members'>
                    <div className='edit-chunk'>
                        <img className='edit-group-deets-icon' src={members} alt='members' />
                    </div>
                    <span>
                        {`${!!group?.numMembers ? group?.numMembers : 0} ${group?.numMembers > 1 || !group?.numMembers ? 'members' : 'member'} `} 	&middot; {!!group?.private ? 'Private group' : 'Public group'}
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
                        {group?.about}
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
                    Group Name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    City
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    State
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Private Group?
                    <input
                      type="checkbox"
                      value={!!privacy ? true : false}
                      checked={!!privacy ? true : false}
                      onChange={(e) => setPrivacy(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    About
                    <textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                    />
                  </label>
                  <p></p>
                  <button type="submit" className="edit-submit-button">Sign up</button>
                  </div>
                </form>
            </div>
        </div>
    )
}
export default EditGroup;
