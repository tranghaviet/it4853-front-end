import React, { Component } from 'react';

export default class Pagination extends Component {
  render() {
    return (
      <div className="text-center input-group-btn">
        <button className="btn btn-primary">Previous</button>
        <button className="btn btn-primary">Next</button>
      </div>
    );
  }
}
