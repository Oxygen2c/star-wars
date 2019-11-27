import React, { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";
import Preloader from "../preloader";
import ErrorNotification from "../error-notification/error-notification";
export default class RandomPlanet extends Component {
  swapi = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };
  componentDidMount() {
    this.updatePlanet();
    this.timer = setInterval(this.updatePlanet, 2000);
  }
  UNSAFE_componentWillMount() {
    clearInterval(this.timer);
  }
  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 8) + 2;
    this.swapi
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;
    const loader = loading ? <Preloader /> : null;
    const content = !(loading || error) ? <PlanetView planet={planet} /> : null;
    const errorContent = error ? <ErrorNotification /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {loader}
        {content}
        {errorContent}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, gravity, climate, terrain, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt=""
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Climate</span>
            <span>{climate}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Terrain</span>
            <span>{terrain}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Gravity</span>
            <span>{gravity}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
