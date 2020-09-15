import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
//Pages
import GettingStartedPage from "./Pages/GettingStartedPage";
import LoginPage from "./Pages/LoginPage";
import PersonalDetails from "./Pages/PersonalDetails";
import Announcement from "./Pages/Announcement";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={GettingStartedPage} />
          <Route path="/LoginPage"  component={LoginPage} />
          <Route path="/PersonalDetails"  component={PersonalDetails} />
          <Route path="/Announcement"  component={Announcement} />
        </Switch>
      </Router>
    );
  }
}
