import React, { Component } from "react";
import Preloader from "../preloader";
import "./item-list.css";

export default class ItemList extends Component {
  state = {
    itemsList: [],
    loading: true
  };

  componentDidMount() {
    const { getData } = this.props;
    getData().then(itemsList => {
      this.setState({ itemsList, loading: false });
    });
  }

  renderItem = itemsList => {
    return itemsList.map(item => {
      const { id } = item;
      const label = this.props.renderData(item);
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {label}
        </li>
      );
    });
  };

  render() {
    const { itemsList, loading } = this.state;
    const loader = loading ? <Preloader /> : null;
    const items = !loading ? this.renderItem(itemsList) : null;

    return (
      <ul className="item-list list-group">
        {items}
        {loader}
      </ul>
    );
  }
}
