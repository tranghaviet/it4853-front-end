import React, { Component } from 'react';
import './Result.css';
import Item from './Item/Item';

export default class Result extends Component {
  listResults(results) {
    let listItems = null;

    if(results == null) {
     listItems = <p>Please enter query</p>;
    } else {
      console.log(results);
      listItems = results.map(e => {
        return <Item item={e} />
      });
    }

    // console.log(listItems);
    return <div className="center-block result-block">{listItems}</div>
  }

  render() {
    return this.listResults(this.props.results);
  }
}
