/*a service for calculating the max exchange-rate value in the fetched chart data array
looks for the highest "high" value in the array*/
const getMaxValue = ({ data }) => Math.max.apply(null, data.map(ts=>ts.high));
export default getMaxValue;
