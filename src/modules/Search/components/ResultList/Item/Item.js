import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div className="list-group-item item">
        <div className="item-title h3">
          <a href={this.props.item._source.url}>
            {this.props.item._source.title}
          </a>
        </div>
        <div className="item-score">
          <p><b>
            Score: {this.props.item._score}
          </b></p>
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
