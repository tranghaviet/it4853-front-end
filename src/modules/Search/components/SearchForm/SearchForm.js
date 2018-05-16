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
      is_bool: true,
      field_title: true,
      field_content: true,
      query_type: 'query_string',
      cutoff_frequency: 0,
    };
  }

  sendQuery = (query) => {
    axi({
      method: 'post',
      url: `/${configEls.index}/_doc/_search?size=${this.state.limit}&from=${this.state.offset}`,
      data: {
        query: {
          [this.state.query_type]: {
            fields: ['title', 'content'],
            query: query
          },
          // cutoff_frequency: this.state.cutoff_frequency,
        },
      },
    })
    .then(res => {
      // console.log(res.data);
      this.props.senddataToParent(res.data);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <form className="form-row" onSubmit={this.handleSubmit}>
        <div>
          {/* input search */}
          <div className="form-group col-sm-12">
            <div className="input-group">
              <input type='text' onChange={this.onInputChange} name="query" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button className="btn btn-success btn-submit" type="submit">
                  Search
                </button>
              </span>
            </div>
          </div>
          {/* ---end inpput search--- */}

          <div className= "form-group">
            <div className="form-group col-sm-3">
              <label htmlFor="limit" className="control-label">Limit: </label>
              <input type="number" id="limit" name="limit" className="form-control" value={this.state.limit} min={1} step={1} onChange={this.onInputChange}/>
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="offset" className="control-label">Offset: </label>
              <input type="number" name="offset" id="offset" className="form-control" value={this.state.offset} min={0} step={1} onChange={this.onInputChange}/>
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="cutoff_frequency" className="control-label">Cutoff frequency: </label>
              <input type="number" id="cutoff_frequency" className="form-control" min={0} step={0.001} max={1} />
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="query-type">Query type: </label>
              <select name="query_type" id="query-type" className="form-control" onChange={this.onInputChange}>
                <option value="match">match</option>
                <option value="match_all">match_all</option>
                <option value="match_phrase">match_phrase</option>
                <option value="match_phrase_prefix">match_phrase_prefix</option>
                <option value="multi_match">multi_match</option>
                <option value="common_terms">common_terms</option>
                <option value="query_string" selected>query_string (default)</option>
                <option value="simple_query_string">simple_query_string</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group col-sm-2">
              <div className="">
                <input type="checkbox" name="is_bool" id="is_bool" className="form-check-input" onChange={this.onInputChange} checked={this.state.is_bool}/>
                <label className="form-check-label" htmlFor="is_bool"> Boolean</label>
              </div>
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="must" className="control-label">Must: </label>
              <input type="text" name="offset" id="must" className="form-control" onChange={this.onInputChange} placeholder="term1, term2..."/>
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="filter" className="control-label">Filter: </label>
              <input type="text" name="filter" id="filter" className="form-control" onChange={this.onInputChange} placeholder="term1, term2..."/>
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="must_not" className="control-label">Must not: </label>
              <input type="text" name="must_not" id="must_not" className="form-control" onChange={this.onInputChange} placeholder="term1, term2..."/>
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="should" className="control-label">Should: </label>
              <input type="text" name="should" id="should" className="form-control" onChange={this.onInputChange} placeholder="term1, term2..."/>
            </div>

            <div className="form-group col-sm-2">
              <label htmlFor="should" className="control-label">Should: </label>
              <input type="text" name="should" id="should" className="form-control" onChange={this.onInputChange} placeholder="term1, term2..."/>
            </div>

            <div className="form-group col-sm-4">
              <div className="row">
                <div className="col-sm-4">
                  Fields:
                </div>
                <div className="col-sm-4">
                  <input type="checkbox" name="field_title" id="field_title" className="form-check-input" onChange={this.onInputChange} checked={this.state.field_title}/>
                  <label className="form-check-label" htmlFor="field_title"> Title</label>
                </div>
                <div className="col-sm-4">
                  <input type="checkbox" name="field_content" id="field_content" className="form-check-input" onChange={this.onInputChange} checked={this.state.field_content}/>
                  <label className="form-check-label" htmlFor="field_content"> Content</label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-4">
              <label htmlFor=""></label>
            </div>
          </div>
        </div>
      </form>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.query != '') {
      this.sendQuery(this.state.query);
    }
  }

  onInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[event.target.name]: value});
    // console.log(this.state);
    if (this.props.query != '') {
      this.sendQuery(this.state.query);
    }
  }
}
