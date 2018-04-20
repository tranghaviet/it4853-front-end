import React, { Component } from 'react';
import './Result.css';
import Item from './Item/Item';

export default class Result extends Component {
  listResults(data) {
    const  listItems = data.hits.hits.map(e => {
      return <Item item={e} key={e._id} />;
    });

    return <div className="result-block">{listItems}</div>;
  }

  render() {
    if (!this.props.data) {
      return <div className="h2 text-center">Please enter query</div>;
    }

    return (
      <div>
        <p>Total results: {this.props.data.hits.total}</p>
        {this.listResults(this.props.data)}
      </div>
    );
  }
}
