import React from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorNotification from "../error-notification";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends React.Component {
  swapiService = new SwapiService();

  state = {
    personSelectedId: 8,
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
    console.log("componentDidCatch()");
  }

  onItemSelected = id => {
    this.setState({
      personSelectedId: id
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorNotification />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPlanets}
        renderData={({ name, population, climate }) => {
          return `${name} (pop: ${population}, ${climate})`;
        }}
      />
    );

    const personDetails = (
      <PersonDetails
        personId={this.state.personSelectedId}
        getData={this.swapiService.getPlanet}
      />
    );

    return (
      <div className="row mb2">
        <div className="col-md-6">{itemList}</div>
        <div className="col-md-6">{personDetails}</div>
      </div>
    );
  }
}
