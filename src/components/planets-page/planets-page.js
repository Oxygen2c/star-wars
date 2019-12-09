import React from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorNotification from "../error-notification";

export default class PeoplePage extends React.Component {
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
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onItemSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.personSelectedId} />
        </div>
      </div>
    );
  }
}
