import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div className="item">
        <div className="item-title">
          {/* <a href={this.props.url}>
            {this.props.title} */}
          <a href="#">
            afasdfgasdgg
          </a>
        </div>

        <div className="item-content">
          <p>
            {/* {this.props.content} */}
            adfasd
          </p>
        </div>
      </div>
    );
  }
}

export default Item;
