import React from 'react';

import {getCharts} from './api/rapid-api-yahoo-finance';

var Chart = require("react-google-charts").Chart;

class CandlestickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.symbol,
      range: '',
      data: []
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    getCharts({symbol: this.state.symbol}, this.updateData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.symbol !== this.props.symbol) {
      console.log('update chart');
      this.setState({symbol: this.props.symbol}, () => {
        console.log("chart state symbol updated");
        getCharts({symbol: this.state.symbol}, this.updateData);
      });
    }
  }

  updateData = (newData) => {
    this.setState({data: newData}, ()=> {
      console.log(this.state.data)
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.symbol}</h3>
        <Chart
          width={'100%'}
          height={500}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={this.state.data}
          options={{
            legend: 'none',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}

export default CandlestickChart;