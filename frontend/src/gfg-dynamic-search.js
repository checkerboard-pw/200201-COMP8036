import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {autoComplete} from './api/rapid-api-yahoo-finance';
  
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      myOptions: []
    }
  }

  onValueChange = (event, newValue) => {
    this.setState({value: newValue});
    this.props.onValueChange(newValue);
  };
  
  getDataFromAPI = (event) => {
    console.log("Fetching Options from API with query", event.target.value);
    autoComplete(event.target.value).then((response) => {
      return response.data.quotes;
    }).then((response) => {
      console.log(response);
      const res = response.filter((data) => {
        return data.quoteType == "EQUITY";
      }).map((data) => {
        return data.symbol;
      })
      this.setState({myOptions: res});
    }).catch((err) => {});
  };
  
  render (){
    return (
      <div style={{ marginLeft: '40%', marginTop: '60px' }}>
        <Autocomplete
          value={this.state.value}
          onChange={this.onValueChange}
          style={{ width: 500 }}
          freeSolo
          autoComplete
          autoHighlight
          options={this.state.myOptions}
          renderInput={(params) => (
            <TextField {...params}
              onChange={this.getDataFromAPI}
              variant="outlined"
              label="Equity Search"
            />
          )}
        />
      </div>
    );
  };
};
  
export default App;