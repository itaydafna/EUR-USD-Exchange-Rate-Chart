import fetchChartData from "../services/fetch-chart-data";
import ACTIONS, { setChartData } from "../actions";

//redux middleware for fetching the chart data and setting it in the store
const fetchChartDataMiddleware = ({ dispatch }) => next => action => {
	if (action.type === ACTIONS.FETCH_CHART_DATA) {
		const { tsType } = action;
		fetchChartData({ tsType }).then(data => {
			dispatch(setChartData({ data, tsType }));
		});
	}
	next(action);
};

export default fetchChartDataMiddleware;
