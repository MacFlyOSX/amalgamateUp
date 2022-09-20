// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import GroupsIndex from "./components/GroupsBrowser";
import EventsIndex from "./components/EventsBrowser";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Footer isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route exact path='/'>

        </Route>
          <Route path="/groups">
            <GroupsIndex />
          </Route>
          <Route path='/events'>
            <EventsIndex />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
