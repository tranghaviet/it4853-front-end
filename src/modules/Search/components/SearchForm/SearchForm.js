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
      is_bool: true,
      field_title: true,
      field_content: true,
    };
  }

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
      <form className="form-row" onSubmit={this.handleSubmit}>
        <div>
          <div className="form-group col-sm-12">
            <div className="input-group">
              <input type='text' onChange={this.onChangeQuery} name="search" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button className="btn btn-success btn-submit" type="submit">
                  Search
                </button>
              </span>
            </div>
          </div>

          <div className= "form-group">
            <div className="form-group col-sm-3">
              <label htmlFor="limit" className="control-label">Limit: </label>
              <input type="number" id="limit" name="limit" className="form-control" min={1} step={1} onChange={this.onInputChange}/>
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="offset" className="control-labe">Offset: </label>
              <input type="number" name="offset" id="offset" className="form-control" min={0} step={1} onChange={this.onInputChange}/>
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="cutoff_frequency" className="control-label">Cutoff frequency: </label>
              <input type="number" id="cutoff_frequency" className="form-control" min={0} step={0.001} max={1} />
            </div>

            <div className="form-group col-sm-3">
              <label htmlFor="query-type">Query type: </label>
              <select name="query_type" id="query-type" className="form-control">
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
            <div className="form-group col-sm-4">
              <div className="">
                <input type="checkbox" name="is_bool" id="is_bool" className="form-check-input" onChange={this.onInputChange} checked={this.state.is_bool}/>
                <label className="form-check-label" for="is_bool"> Boolean</label>
              </div>
            </div>

            <div className="form-group col-sm-4">
              <div className="row">
                <div className="col-sm-4" >
                  Fields:
                </div>
                <div className="col-sm-4">
                  <input type="checkbox" name="field_title" id="field_title" className="form-check-input" onChange={this.onInputChange} checked={this.state.field_title}/>
                  <label className="form-check-label" for="field_title"> Title</label>
                </div>
                <div className="col-sm-4">
                  <input type="checkbox" name="field_content" id="field_content" className="form-check-input" onChange={this.onInputChange} checked={this.state.field_content}/>
                  <label className="form-check-label" for="field_content"> Content</label>
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

    if (!this.props.query) {
      this.sendQuery(this.state.query);
    }
  }

  onInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[event.target.name]: value});
    console.log(this.state);
  }
}
