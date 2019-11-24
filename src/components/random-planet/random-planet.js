import React, { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {
  swapi = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  }

  state = {
    planet: {}
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 8) + 2;
    this.swapi.getPlanet(id).then(planet => {
      this.setState({ planet });
    });
  }

  render() {
    const {
      planet: { id, name, population, gravity, climate, terrain, diameter }
    } = this.state;
    return (
      <div className="random-planet jumbotron rounded">
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
      </div>
    );
  }
}
