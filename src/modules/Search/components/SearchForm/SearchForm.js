import React from 'react';
import './SearchForm.css';
import configEls from '../../../../config/els';
import axi from "../../../../utils/axi";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      limit: 20,
      offset: 0,
      // data: null,
    };
  }

  handleChangeQuery = (event) => {
    this.setState({query: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.props.query) {
      this.sendQuery(this.state.query);
    }
  };

  sendQuery = (query) => {
    axi({
      method: 'post',
      url: `/${configEls.index}/_doc/_search?size=${this.state.limit}&from=${this.state.offset}`,
      data: {
        query: {
          query_string: {
            fields: ['title', 'content'],
            query: query
          }
        }
      },
    })
    .then(res => {
      console.log(res.data);
      // this.setState({data: res.data});
      this.props.senddataToParent(res.data);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type='text' onChange={this.handleChangeQuery} name="search" className="form-control" placeholder="Search..." />
          <span className="input-group-btn">
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </span>
        </div>
      </form>
    );
  }
}
