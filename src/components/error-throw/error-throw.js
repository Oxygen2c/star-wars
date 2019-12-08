import React from "react";
export default class ErrorThrow extends React.Component {
  state = {
    error: false
  };
  throwError = () => {
    this.setState({ error: true });
  };
  render() {
    if (this.state.error) {
      this.fsfs();
    }
    return (
      <div className="error-throw">
        <button className="btn" onClick={this.throwError}>
          Throw error
        </button>
      </div>
    );
  }
}
