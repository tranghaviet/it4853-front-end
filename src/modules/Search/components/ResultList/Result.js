import React, { Component } from 'react';
import './Result.css';
import Item from './Item';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function ListResult(props) {
  const numbers = props.numbers;

  const listItems = numbers.map(number => (
    <li key={number.toString()}>
      <Item />
    </li>
  ));

  return <ul>{listItems}</ul>;
}

class Result extends Component {
  render() {
    return ListResult({ numbers });
  }
}


export default Result;
