import { NavLink } from "react-router-dom";
import mainImage from '../../icons/mainImage.svg';
import './Root.css';
import joinAgroup from '../../icons/joinAgroup.svg';
import findAnEvent from '../../icons/findAnEvent.svg';
import startAgroup from '../../icons/startAgroup.svg';
import { useSelector } from "react-redux";

const RootPage = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        <div className="root-page-container">
        <div className="top-root-container">
            <div className="left-text">
                <h1 className="main-root-title">Meaningful connections on AmalgamateUp</h1>
                <p className="main-root-info">Whatever you’re looking to do this year, AmalgamateUp can help!
                Our main focus is for AmalgamateUp to help people meet people, make friends,
                find support, grow a business, and explore their interests. Thousands of
                events are happening every day — join the fun!</p>
            </div>
            <div className="right-side-image">
                <img className="root-main-image" src={mainImage} alt='mainImage' />
            </div>
        </div>
        <div className="middle-root-container">
            <div className="middle-root box1">
                <img className='middle-image' src={joinAgroup} alt='joinAgroup' />
                <NavLink className="middle-text join" to='/groups'>Join a group</NavLink>
                <p className="middle-info-text">
                Do what you love, meet others who love it, find your community. The rest is history!
                </p>
            </div>
            <div className="middle-root box2">
                <img className='middle-image' src={findAnEvent} alt='findAnEvent' />
                <NavLink className="middle-text join" to='/events'>Find an event</NavLink>
                <p className="middle-info-text">
                Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.
                </p>
            </div>
            <div className="middle-root box3">
                <img className='middle-image' src={startAgroup} alt='startAgroup' />
                <NavLink className="middle-text join" to={sessionUser ? '/groups/new' : '/noaccess'}>Start a group</NavLink>
                <p className="middle-info-text">
                You don’t have to be an expert to gather people together and explore shared interests.
                </p>
            </div>
        </div>
        </div>
        </>
    )
}

export default RootPage;
