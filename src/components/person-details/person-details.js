import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";

import "./person-details.css";

export default class PersonDetails extends Component {
  swapi = new SwapiService();

  state = {
    person: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  onPersonLoaded = person => {
    this.setState({ person, loading: false });
  };
  onError = () => {
    this.setState({ error: true });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapi
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  render() {
    const {
      person: { id, name, gender, birthYear, eyeColor }
    } = this.state;
    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt=""
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
