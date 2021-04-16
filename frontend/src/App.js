import CandlestickChart from './chart';
import DynamicSearch from './gfg-dynamic-search';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementinfo: 'stock',
      symbol: ''
    };
  }

  updateResult = (newSymbol) => {
    this.setState({symbol: newSymbol}, () => {
      console.log("app updated symbol", this.state.symbol);
    });
  }
  
  render () {
    return (
      <div className="App">
        <DynamicSearch onValueChange={this.updateResult}/>
        <CandlestickChart symbol={this.state.symbol} />
      </div>
    )
  };
}

export default App;