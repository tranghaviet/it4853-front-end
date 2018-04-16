import React from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Result from './components/ResultList/Result';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    }
  }

  getResultsFromSearchForm = (results) => {
    this.setState({results: results});
  }

  render() {
    return (
      <div>
        <SearchForm sendResultsToParent={this.getResultsFromSearchForm} />
        <Result results={this.state.results} />
      </div>
    );
  }
}
