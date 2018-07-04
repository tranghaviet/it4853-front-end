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
    if (!this.props.data || this.props.data.hits.total === 0) {
      return <div className="h2 text-center">Please enter query</div>;
    }
    console.log('result props');
    console.log(this.props);

    return (
      <div>
        <h3>Total results: <b>{this.props.data.hits.total}</b>, max score: <b>{this.props.data.hits.max_score}</b></h3>
        {this.listResults(this.props.data)}
      </div>
    );
  }
}
