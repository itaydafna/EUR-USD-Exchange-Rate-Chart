# EUR-USD Exchange-Rate Chart
### A dynamic **EUR/USD exchange-Rate timeline Chart app** created with [React](https://github.com/facebookincubator/create-react-app), [Redux](https://redux.js.org/), [Material-Ui](http://www.material-ui.com/#/) and [React Timeseries Charts](http://software.es.net/react-timeseries-charts/).

To run the app locally:

1. Download or clone the branch.
2. Run `npm install` or `yarn`.
3. Run `npm start` or `yarn start`. 

The application will serve on  [http://localhost:3000](http://localhost:3000)

A [**live demo**](https://eur-usd-exchange-rate-chart.herokuapp.com) of the application, deployed with [Heroku](https://www.heroku.com/) can be found on this [**link**](https://eur-usd-exchange-rate-chart.herokuapp.com).


## A few Notes:
- The apps routing is managed with [react-router-dom](https://reacttraining.com/react-router/web/guides/philosophy) (react-router 4). Navigation and routing is connected to and handled by the [Material-Ui tabs](http://www.material-ui.com/#/components/tabs) in the Main component.

- The app's general state and fetch calls to the api are managed with [Redux](https://redux.js.org/)

- The chart was created using [React Timeseries Charts](http://software.es.net/react-timeseries-charts/) - a time-chart library which utilizes [D3](https://github.com/d3). What I like about it is that it has some really nice features out of the box like a **dynamic tracker**, **selectable legnd and chart lines**, and an interactive **dynamic time range**. 
- Make sure to click on the legend and chart lines and to zoom and drag on the chart's body in order to see this in action.
- Since changes on the data for the shorter time intervals (MIN_1,MIN_5) are very subtle, I decided to display a different number of digits after the decimal point for each timestamp-type, in order for the changes to be noticed (2 digits for one week, three for 1 hour, four for 1 and 5 minutes).  



