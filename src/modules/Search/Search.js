import React from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Result from './components/ResultList/Result';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  getDataFromSearchForm = (data) => {
    this.setState({data: data});
  }

  render() {
    return (
      <div className="center-block">
        <SearchForm senddataToParent={this.getDataFromSearchForm} />
        <Result data={this.state.data} />
      </div>
    );
  }
}
