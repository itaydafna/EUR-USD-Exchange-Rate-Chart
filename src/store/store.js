import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/index";
import fetchChartDataMiddleware
	from "../middleware/fetch-chart-data-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

//creating the redux store
const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(fetchChartDataMiddleware))
);

export default store;
