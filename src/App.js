import React, { Component } from 'react';
import './App.css';
import SearchForm from './modules/Search/Search';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="text-center slogan">
          <h1>Search with Elastic Search</h1>
        </div>
        <SearchForm />
      </div>
    );
  }
}

export default App;
