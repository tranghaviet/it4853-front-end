import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    console.log(props.item);
  }

  render() {
    return (
      <div className="list-group-item item">
        <div className="item-title h3">
          <a href={this.props.item.url}>
            {this.props.item.title}
          </a>
        </div>
        <div className="item-content">
          <p>
            {this.props.content}
          </p>
        </div>
      </div>
    );
  }
}

export default Item;
