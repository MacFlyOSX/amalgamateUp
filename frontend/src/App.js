// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import GroupsIndex from "./components/GroupsBrowser";
import EventsIndex from "./components/EventsBrowser";
import GroupDetails from "./components/GroupDetails";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RootPage from "./components/RootPage";
import Background from "./components/Background";
import EditGroup from "./components/EditGroup";
import CreateGroup from "./components/CreateGroup";

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
            <Background />
            <RootPage isLoaded={isLoaded} />
          </Route>
          <Route path='/groups/new'>
            <CreateGroup />
          </Route>
          <Route path='/groups/:groupId/edit'>
            <EditGroup />
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
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
