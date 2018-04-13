import React, { Component } from 'react';
import './App.css';
import SearchForm from './modules/Search/Search';
import Footer from "./modules/Common/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="text-center slogan">
            <h1>Search with Elastic Search</h1>
          </div>
          <SearchForm />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
