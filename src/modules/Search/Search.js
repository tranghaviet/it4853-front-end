import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Result from './components/ResultList/Result';

class Search extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Result />
      </div>
    );
  }
}

export default Search;
