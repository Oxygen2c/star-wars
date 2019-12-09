import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import ErrorThrow from "../error-throw/error-throw";
import ErrorNotification from "../error-notification";
import PeoplePage from "../people-page";
import PlanetsPage from "../planets-page";

export default class App extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
    console.log("componentDidCatch()");
  }

  render() {
    if (this.state.hasError) {
      return <ErrorNotification />;
    }
    return (
      <div>
        <Header />
        <RandomPlanet />
        <ErrorThrow />
        <PeoplePage />
        <br />
        <PlanetsPage />
      </div>
    );
  }
}
