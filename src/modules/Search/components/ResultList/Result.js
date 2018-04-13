import React, { Component } from 'react';
import './Result.css';
import Item from './Item/Item';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function ListResult(props) {
  const numbers = props.numbers;

  const listItems = numbers.map(number => (
    <div className="list-group-item result-item" key={number.toString()}>
      <Item />
    </div>
  ));

  return <div className="center-block result-block">{listItems}</div>;
}

class Result extends Component {
  render() {
    return ListResult({ numbers });
  }
}


export default Result;
