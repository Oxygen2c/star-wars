import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

import "./app.css";
import ErrorThrow from "../error-throw/error-throw";
import ErrorNotification from "../error-notification";

export default class App extends React.Component {
  state = {
    personSelectedId: 4,
    hasError: false
  };

  onItemSelected = id => {
    this.setState({
      personSelectedId: id
    });
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
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onItemSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.personSelectedId} />
          </div>
        </div>
      </div>
    );
  }
}
