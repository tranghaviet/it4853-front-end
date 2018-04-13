import { Form, Text } from 'react-form';
import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  render() {
    return (
      <Form>
        {formApi => (
          <form className="form-group">
            <div className="input-group">
              <Text field="search" id="title-input" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button className="btn btn-success" type="submit">
                  <i aria-hidden="true"></i> Search
                </button>
              </span>
            </div>
          </form>
        )}
      </Form>
    )
  }
}

export default SearchForm;
