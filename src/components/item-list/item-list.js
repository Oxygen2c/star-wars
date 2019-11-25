import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Preloader from "../preloader";
import "./item-list.css";

export default class ItemList extends Component {
  swapi = new SwapiService();

  state = {
    peopleList: []
  };

  componentDidMount() {
    this.swapi.getAllPeople().then(peopleList => {
      console.log(peopleList);
      this.setState({ peopleList });
    });
  }

  renderItem = peopleList => {
    return peopleList.map(({ name, id }) => {
      return (
        <li className="list-group-item" key={id}>
          {name}
        </li>
      );
    });
  };

  render() {
    const { peopleList } = this.state;
    const items = this.renderItem(peopleList);

    if (!peopleList) {
      return <Preloader />;
    }
    return <ul className="item-list list-group">{items}</ul>;
  }
}
