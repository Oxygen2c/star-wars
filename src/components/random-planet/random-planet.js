import React, { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";
import Preloader from "../preloader";
export default class RandomPlanet extends Component {
  swapi = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  }

  state = {
    planet: {},
    loading: true
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 8) + 2;
    this.swapi.getPlanet(id).then(planet => {
      this.setState({ planet, loading: false });
    });
  }

  render() {
    const { planet, loading } = this.state;
    const loader = loading ? <Preloader /> : null;
    const content = !loading ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {loader}
        {content}
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
