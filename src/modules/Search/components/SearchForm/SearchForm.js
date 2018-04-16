import React from 'react';
import './SearchForm.css';
import axios from '../../../../utils/axi';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
  }

  handleChangeQuery = (event) => {
    const query = event.target.value;
    // console.log(query);
    let results = null;
    axios({
      data: {
        query: {
          query_string: {
            default_field: 'content',
            query: query
          }
        }
      }
    })
    .then(res => results = res)
    .catch(err => console.log(err));

    console.log(results);

    this.props.sendResultsToParent(results);
    // this.props.sendResultsToParent([
    //   {
    //     title: 'aaa',
    //     content: 'bbb',
    //   },
    //   {
    //     title: 'ccc',
    //     content: 'ddd',
    //   }
    // ]);
    // this.setState({query: event.target.value});
  }

  handleSubmit = (event) => event.preventDefault();

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
    )
  }
}
