import React from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorNotification from "../error-notification";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends React.Component {
  swapiService = new SwapiService();

  state = {
    personSelectedId: 4,
    hasError: false,
    loading: true
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
    console.log("componentDidCatch()");
  }

  onItemSelected = id => {
    this.setState({
      personSelectedId: id,
      loading: true
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorNotification />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}
        renderData={({ name, gender, birthday }) => {
          return `${name} (${gender}, ${birthday})`;
        }}
      />
    );

    const personDetails = (
      <PersonDetails
        personId={this.state.personSelectedId}
        loading={this.state.loading}
        getData={this.swapiService.getPerson}
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
