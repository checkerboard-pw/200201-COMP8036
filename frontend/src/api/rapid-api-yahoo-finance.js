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
let cancelAutoComplete;

const autoComplete = (query) => {
  if (cancelAutoComplete !== undefined) cancelAutoComplete();
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
    console.log("cancel get charts");
    return;
  }
  let dummy = [
    ['day', 'a', 'b', 'c', 'd'],
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 77, 77, 66, 50],
    ['Fri', 68, 66, 22, 15],
  ];
  updateResult(dummy);
  return;
  // RapidApiYahooFinance({
  //   'method': 'GET',
  //   'url': '/market/get-charts',
  //   'params': {
  //     'symbol': query.symbol,
  //     'interval': "5m",
  //     'range': "1d",
  //     'region': "ID"
  //   },
  //   transformResponse: [(data, request) => {
  //     const json = JSON.parse(data);
  //     // console.log(request, json);
  //     const chartResult = {
  //       timestamp: json.chart.result[0].timestamp, 
  //       quote: json.chart.result[0].indicators.quote[0]
  //     };
  //     // console.log(chartResult);
  //     // transform to googlechart candlestick
  //     let forGoogleChartCandleStick = [['UTC', 'low', 'open', 'close', 'high']];
  //     const chartData = chartResult.timestamp.map(
  //       (timestamp, index) => [
  //           unixToUTCString(timestamp),
  //           chartResult.quote.low[index],
  //           chartResult.quote.open[index],
  //           chartResult.quote.close[index],
  //           chartResult.quote.high[index]
  //       ]);
  //     // console.log(chartData);
  //     forGoogleChartCandleStick = forGoogleChartCandleStick.concat(
  //       chartData.filter((chartData) => (chartData[1] !== null)));
  //     console.log(forGoogleChartCandleStick);
  //     updateResult(forGoogleChartCandleStick);
  //     // NOTHANDLED: Multiple results
  //   }]
  // });
};

export {autoComplete, getCharts};