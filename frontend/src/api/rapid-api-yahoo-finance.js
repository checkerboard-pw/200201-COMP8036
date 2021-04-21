import appConfig from '../asset/appConfig.json';

const axios = require('axios').default;

const RapidApiYahooFinance = axios.create({
  baseURL: 'https://' + appConfig['api-access']['rapid-api-yahoo-finance'].host,
  headers: {
    'x-rapidapi-host': appConfig['api-access']['rapid-api-yahoo-finance'].host,
    'x-rapidapi-key': appConfig['api-access']['rapid-api-yahoo-finance'].key
  }
})

const unixToUTCString = (unixTimestamp) => {
  let dateObj = new Date(unixTimestamp * 1000);
  let utcString = dateObj.toUTCString();
  return utcString;
};

const CancelToken = axios.CancelToken;
let cancelAutoComplete = null;

const autoComplete = (query) => {
  if (cancelAutoComplete !== null) cancelAutoComplete();
  return RapidApiYahooFinance({
    'method': 'GET',
    'url': '/auto-complete',
    'params': {
      'q': query
    },
    'cancelToken': new CancelToken((cancel) => {
      cancelAutoComplete = cancel;
    })
  }).catch((error) => {
    if ( axios.isCancel(error)){
      console.log('cancelled', error);
    } else {
      console.log('err', error);
    };
  });
};

const getCharts = (query, updateResult) => {
  console.log('getcharts', query);
  if(query.symbol === '') {
    console.log("cancel get charts - no symbol");
    return;
  }
  RapidApiYahooFinance({
    'method': 'GET',
    'url': '/market/get-charts',
    'params': {
      'symbol': query.symbol,
      'interval': "5m",
      'range': "1d",
      'region': "ID"
    },
    transformResponse: [(data, request) => {
      const json = JSON.parse(data);
      const chartResult = {
        timestamp: json.chart.result[0].timestamp, 
        quote: json.chart.result[0].indicators.quote[0]
      };
      let forGoogleChartCandleStick = [['UTC', 'low', 'open', 'close', 'high']];
      const chartData = chartResult.timestamp.map(
        (timestamp, index) => [
            unixToUTCString(timestamp).slice(-12),
            chartResult.quote.low[index],
            chartResult.quote.open[index],
            chartResult.quote.close[index],
            chartResult.quote.high[index]
        ]);
      forGoogleChartCandleStick = forGoogleChartCandleStick.concat(
        chartData.filter((chartData) => (chartData[1] !== null)));
      console.log(forGoogleChartCandleStick);
      updateResult(forGoogleChartCandleStick);
    }]
  });
};

export {autoComplete, getCharts};