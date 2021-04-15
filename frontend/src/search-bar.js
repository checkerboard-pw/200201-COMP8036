import React from 'react';

import {autoComplete} from './api/rapid-api-yahoo-finance';


class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      result: []
    };
  }

  updateResult = (result) => {
    this.setState({result: result}, () => {
      console.log(result);
    });
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    // this.setState({query: query})
    autoComplete(query, this.updateResult);
  }

  handleOnResultClick = (event) => {
    console.log(event.target.value);
    this.props.onSearchResultClick(event.target.value);
  }

  render() {
    return (
      <div>
        <form className="search-label">
          <input 
            type="text"
            id="search-input" 
            placeholder="Search Quote..." 
            onChange={this.handleOnInputChange}
          />
        </form>
        <SearchResult 
          result={this.state.result} 
          onClick={this.handleOnResultClick}
        />
      </div>
    );
  }
}

class SearchResult extends React.Component {
  render() {
    let result = this.props.result;
    return (
      <div>
        {result.map(({symbol}) => (
          <button 
            value={symbol} 
            key={symbol} 
            onClick={this.props.onClick}>
              {symbol}
          </button>
        ))}
      </div>
    )
    // ERR: not showing quotename
  }
}

export default Search;