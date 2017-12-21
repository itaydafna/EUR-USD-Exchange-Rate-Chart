/*a service for calculating the min exchange-rate value in the fetched chart data array
looks for the lowest "low" value in the array*/
const getMinValue = ({ data }) => Math.min.apply(null, data.map(ts=>ts.low));
export default getMinValue;