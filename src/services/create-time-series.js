import moment from "moment";
import { TimeSeries } from "pondjs";

//a service for creating a pond.js TimeSeries object out of the fetched chart-data
const createTimeSeries = ({ data }) =>
	new TimeSeries({
		name: "EUR-USD",
		columns: ["time", "open", "high", "low", "close"],
		points: data
        .map(ts => [moment(ts.date).format('x'), ts.open, ts.high, ts.low, ts.close])
        //sort chronologically by timestamps
        .sort((a, b) => a[0] - b[0])
	});

export default createTimeSeries;