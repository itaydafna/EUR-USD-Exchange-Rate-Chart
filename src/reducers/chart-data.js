import { combineReducers } from "redux";
import ACTIONS from "../actions";
//redux reducer to hold the chart's data based on the currently selected timestamp type
const data = (state = [], action) => {
	switch (action.type) {
		//clearing the data on every switch between ts types
		case ACTIONS.FETCH_CHART_DATA:
			return [];
		case ACTIONS.SET_CHART_DATA:
			return action.data;
		default:
			return state;
	}
};

//redux reducer to hold the currently selected timestamp type
const tsType = (state = "", action) => {
	switch (action.type) {
		//resetting the ts string on every switch between ts types
		case ACTIONS.FETCH_CHART_DATA:
			return "";
		case ACTIONS.SET_CHART_DATA:
			return action.tsType;
		default:
			return state;
	}
};

export default combineReducers({ data, tsType });
