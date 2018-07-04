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
      field_content: false,
      query_type: 'multi_match',
      cutoff_frequency: 0,
      fields: ['title', 'content'],
    };
  }

  sendQuery() {
    console.log(this.state);
    if (this.props.query === '') {
      return;
    }

    const request = {
      method: 'post',
      url: `/${configEls.index}/_doc/_search/?size=${this.state.limit}&from=${this.state.offset}&filter_path=hits.total,hits.max_score,hits.hits._score,hits.hits._source`,
      data: {
        _source: ['title', 'content', 'url'],
        query: {
          bool: {
            must: [
              {
                [this.state.query_type]: {
                  fields: this.state.fields,
                  query: this.state.query
                },
                // cutoff_frequency: this.state.cutoff_frequency,
              }
            ]
          }
        },
      },
    };

    console.log(request);
    axi(request)
    .then(res => {
      // console.log(res.data);
      this.props.senddataToParent(res.data);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="form-group">
          <input id="query" type='text' onChange={this.onInputChange} name="query" className="form-control" placeholder="Search..." />
        </div>
        <div className="form-group">
          <select name="query_type" id="query-type" className="form-control" onChange={this.onInputChange}>
            <option value="multi_match" defaultValue>multi_match</option>
            <option value="match">match</option>
            <option value="match_phrase">match_phrase</option>
            <option value="match_phrase_prefix">match_phrase_prefix</option>
            <option value="common_terms">common_terms</option>
            <option value="query_string">query_string</option>
            <option value="simple_query_string">simple_query_string</option>
          </select>
        </div>

        {/* <div className="form-group">
          <input type="number" id="cutoff_frequency" className="form-control" min={0} step={0.001} max={1} placeholder="Cutoff frequency"/>
        </div> */}

        {this.isAllowSearchMultiField(this.state.query_type) ? this.multiSelectField() : this.singleSelectField()}

        {/* <div className="form-group">
          <label htmlFor="limit" className="control-label">Limit: </label>
          <input type="number" id="limit" name="limit" className="form-control" value={this.state.limit} min={1} step={1} onChange={this.onInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="offset" className="control-label">Offset: </label>
          <input type="number" name="offset" id="offset" className="form-control" value={this.state.offset} min={0} step={1} onChange={this.onInputChange}/>
        </div> */}

        <div className="form-group">
          <button className="btn btn-success btn-submit" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.sendQuery(this.state.query);
  }

  onInputChange = (event) => {
    // const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // this.setState({[event.target.name]: value});
    this.setState({[event.target.name]: event.target.value});
    // console.log(this.state);

    this.sendQuery(this.state.query);
  }

  isAllowSearchMultiField(queryType) {
    switch (queryType) {
      case 'multi_match':
        return true;
      default:
        return false;
    }
  }

  multiSelectField() {
    // return (
    //   <div className="form-group">
    //     <select name="_source" id="_source" className="form-control" multiple onChange={this.onInputChange}>
    //       <option value="title" defaultValue>title</option>
    //       <option value="content">content</option>
    //     </select>
    //   </div>
    // );

    return (
      <span>
        <div className="form-group">
          <input type="checkbox" name="field_title" id="field_title" className="form-check-input" onChange={this.onSelectFields} checked={this.state.field_title}/>
          <label className="form-check-label" htmlFor="field_title"> Title</label>
        </div>
        <div className="form-group">
          <input type="checkbox" name="field_content" id="field_content" className="form-check-input" onChange={this.onSelectFields} checked={this.state.field_content}/>
          <label className="form-check-label" htmlFor="field_content"> Content</label>
        </div>
      </span>
    );
  }

  onSelectFields = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;

    if(name === 'field_title' && ! checked) { // title checked
      this.setState({field_content: true});
    } else { // content checked
      if (! checked) {
        this.setState({field_title: true});
      }
    }

    this.setState({[name]: checked});
  }

  singleSelectField() {
    return (
      <div className="form-group">
        <select name="_source" id="_source" className="form-control" onChange={this.onInputChange}>
          <option value="title" defaultValue>title</option>
          <option value="content">content</option>
        </select>
      </div>
    );
  }
}
