//redux action constants
const ACTIONS = {
	FETCH_CHART_DATA: "FETCH_CHART_DATA",
	SET_CHART_DATA: "SET_CHART_DATA"
};

/*redux action creators*/

export const fetchChartData = ({ tsType }) => ({
	type: ACTIONS.FETCH_CHART_DATA,
	tsType
});

export const setChartData = ({ data, tsType }) => ({
	type: ACTIONS.SET_CHART_DATA,
	data, 
    tsType
});

export default ACTIONS;
