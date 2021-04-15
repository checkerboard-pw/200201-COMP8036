import Search from './search-bar';
import CandlestickChart from './chart';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementinfo: 'stock',
      symbol: ''
    };
    this.updateResult = this.updateResult.bind(this);
  }

  updateResult = (newSymbol) => {
    this.setState({symbol: newSymbol}, () => {
      console.log("app updated symbol", this.state.symbol)
    });
  }
  
  render () {
    return (
      <div className="App">
        <Search info={this.state.elementinfo} onSearchResultClick={this.updateResult} />
        <CandlestickChart symbol={this.state.symbol} />
      </div>
    )
  };
}

export default App;