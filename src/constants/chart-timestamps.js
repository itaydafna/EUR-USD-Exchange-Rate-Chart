export const TIMESTAMP_TYPES = {
	MIN_1: "MIN_1",
	MIN_5: "MIN_5",
	HOUR_1: "HOUR_1",
	WEEK_1: "WEEK_1"
};

export default [
	{
		tsType: TIMESTAMP_TYPES.MIN_1,
		tabLabel: "1 Minute",
		clientRoute: "1-minute"
	},
	{
		tsType: TIMESTAMP_TYPES.MIN_5,
		tabLabel: "5 Minutes",
		clientRoute: "5-minutes"
	},
	{
		tsType: TIMESTAMP_TYPES.HOUR_1,
		tabLabel: "1 Hour",
		clientRoute: "1-hour"
	},
	{
		tsType: TIMESTAMP_TYPES.WEEK_1,
		tabLabel: "1 Week",
		clientRoute: "1-week"
	}
];
