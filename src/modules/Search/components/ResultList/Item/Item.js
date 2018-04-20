import React, { Component } from 'react';

class Item extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props.item);
  // }

  render() {
    return (
      <div className="list-group-item item">
        <div className="item-title h3">
          <a href={this.props.item._source.url}>
            {this.props.item._source.title}
          </a>
        </div>
        <div className="item-score">
          <p>
            Score: {this.props.item._score}
          </p>
        </div>
        <div className="item-content">
          <p>
            {this.props.item._source.content}
          </p>
        </div>
      </div>
    );
  }
}

export default Item;
