import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Preloader from "../preloader";
import "./item-list.css";

export default class ItemList extends Component {
  swapi = new SwapiService();

  state = {
    peopleList: [],
    loading: true
  };

  componentDidMount() {
    this.swapi.getAllPeople().then(peopleList => {
      this.setState({ peopleList, loading: false });
    });
  }

  renderItem = peopleList => {
    return peopleList.map(({ name, id }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {name}
        </li>
      );
    });
  };

  render() {
    const { peopleList, loading } = this.state;
    const loader = loading ? <Preloader /> : null;
    const items = !loading ? this.renderItem(peopleList) : null;

    return (
      <ul className="item-list list-group">
        {items}
        {loader}
      </ul>
    );
  }
}
