import { API_BASE_URL } from "../constants/paths";

/*a service for making the api request for fetching the chart data 
based on the selected timestamp type*/
const fetchChartData = ({tsType}) =>
	fetch(`${API_BASE_URL}?time=${tsType}`).then(response => {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			return response.json();
		}
	});

export default fetchChartData;
