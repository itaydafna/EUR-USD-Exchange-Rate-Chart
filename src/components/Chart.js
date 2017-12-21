//3rd party dependencies
import React, { Component } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
	Baseline,
	Charts,
	ChartContainer,
	ChartRow,
	YAxis,
	LineChart,
	Legend,
	styler
} from "react-timeseries-charts";

//my services
import createTimeSeries from "../services/create-time-series";
import getMaxValue from "../services/get-max-value";
import getMinValue from "../services/get-min-value";

//constants
import { TIMESTAMP_TYPES } from "../constants/chart-timestamps";
import EXCHANGE_RATE_KEYS from "../constants/exchange-rate-keys";

//styles
import "./Chart.css";

class Chart extends Component {
	state = {
		//the chart's tracker object
		tracker: null,
		//the time-range for the chart (can change on zoom or drag)
		timeRange: null,
		//a string with the chart's selected line (if empty all lines are shown)
		selection: ""
	};

	componentWillMount() {
		const { data } = this.props;
		const timeRange = createTimeSeries({ data }).range();
		/*timeRange object is mapped to the component's state on initial componentWillMount
         in order to make this value controlled by the handleTimeRange method (on chart zoom/drag) */
		this.handleTimeRangeChange(timeRange);
	}

	//handle's the chart's tracker movement
	handleTrackerChanged(tracker) {
		this.setState({ tracker });
	}
	//handle's changing the chart's time-range (zooming/dragging the chart)
	handleTimeRangeChange(timeRange) {
		this.setState({ timeRange });
	}
	//handles selecting one of the chart's lines
	handleLineSelection(selection) {
		this.setState({ selection });
	}

	//reset's the current line selection (on chart background click)
	resetLineSelection() {
		this.setState({ selection: null });
	}

	render() {
		const { data, tsType } = this.props;
		//selecting the chart's decimal point level based on the selected timestamp type
		let dec = 0;
		switch (tsType) {
			case TIMESTAMP_TYPES.WEEK_1:
				dec = 2;
				break;
			case TIMESTAMP_TYPES.HOUR_1:
				dec = 3;
				break;
			case TIMESTAMP_TYPES.MIN_5:
			case TIMESTAMP_TYPES.MIN_1:
				dec = 4;
				break;
			default:
		}

		//formating the legend's decimal point level
		const f = format(`$,.${dec}f`);
		//formating the time format for the tracker's date value
		const df = timeFormat("%b %d %Y %X");
		//calculating the Y axis max value
		const max = getMaxValue({ data });
		//calculating the Y axis min value
		const min = getMinValue({ data });
		//generating the chart's pond.js timeSeries object for the chart
		const timeSeries = createTimeSeries({ data });
		//using the react-timeseries-charts styler function in order to style the legend and chart lines
		const legendStyle = styler([
			{ key: EXCHANGE_RATE_KEYS.CLOSE, color: "steelblue", width: 2 },
			{
				key: EXCHANGE_RATE_KEYS.OPEN,
				color: "purple",
				width: 1,
				dashed: true
			},
			{ key: EXCHANGE_RATE_KEYS.HIGH, color: "green", width: 1 },
			{
				key: EXCHANGE_RATE_KEYS.LOW,
				color: "red",
				width: 1,
				dashed: true
			}
		]);

		//styling the tracker's date value
		const timeStyle = {
			fontSize: "1.2rem",
			color: "#999"
		};

		//id for the Y axis
		const Y_AXIS_ID = "eur-usd";

		//extracting the values from the tracker's current state for the legend
		let closeValue, openValue, highValue, lowValue;
		if (this.state.tracker) {
			const index = timeSeries.bisect(this.state.tracker);
			const trackerEvent = timeSeries.at(index);
			closeValue = `${f(trackerEvent.get(EXCHANGE_RATE_KEYS.CLOSE))}`;
			openValue = `${f(trackerEvent.get(EXCHANGE_RATE_KEYS.OPEN))}`;
			highValue = `${f(trackerEvent.get(EXCHANGE_RATE_KEYS.HIGH))}`;
			lowValue = `${f(trackerEvent.get(EXCHANGE_RATE_KEYS.LOW))}`;
		}

		return (
			<div className="time-chart">
				<div className="legend-container">
					<Legend
						type="line"
						align="right"
						style={legendStyle}
						selection={this.state.selection}
						onSelectionChange={this.handleLineSelection.bind(this)}
						categories={[
							{
								key: EXCHANGE_RATE_KEYS.CLOSE,
								label: "Close",
								value: closeValue
							},
							{
								key: EXCHANGE_RATE_KEYS.OPEN,
								label: "Open",
								value: openValue
							},
							{
								key: EXCHANGE_RATE_KEYS.HIGH,
								label: "High",
								value: highValue
							},
							{
								key: EXCHANGE_RATE_KEYS.LOW,
								label: "Low",
								value: lowValue
							}
						]}
					/>
				</div>
				<ChartContainer
					timeRange={this.state.timeRange}
					maxTime={timeSeries.range().end()}
					minTime={timeSeries.range().begin()}
					trackerPosition={this.state.tracker}
					onTrackerChanged={this.handleTrackerChanged.bind(this)}
					selection={this.state.selection}
					onBackgroundClick={this.resetLineSelection.bind(this)}
					enablePanZoom={true}
					onTimeRangeChanged={this.handleTimeRangeChange.bind(this)}
					minDuration={60 * 60 * 24 * 30}
				>
					<ChartRow height="400">
						<YAxis
							id={Y_AXIS_ID}
							label="EUR/USD Exchange Rate ($)"
							min={min}
							max={max}
							width="60"
							type="linear"
							format={`$,.${dec}f`}
							labelOffset={-10}
							style={{
								labelColor: "green",
								axis: { axisColor: "#C0C0C0" }
							}}
						/>
						<Charts>
							<LineChart
								axis={Y_AXIS_ID}
								style={legendStyle}
								series={timeSeries}
								columns={[
									EXCHANGE_RATE_KEYS.OPEN,
									EXCHANGE_RATE_KEYS.HIGH,
									EXCHANGE_RATE_KEYS.LOW,
									EXCHANGE_RATE_KEYS.CLOSE
								]}
								interpolation="curveBasis"
								selection={this.state.selection}
								onSelectionChange={this.handleLineSelection.bind(
									this
								)}
							/>
							<Baseline
								axis={Y_AXIS_ID}
								value={timeSeries.avg(EXCHANGE_RATE_KEYS.OPEN)}
								label={`Avg: $${timeSeries
									.avg(EXCHANGE_RATE_KEYS.OPEN)
									.toFixed(dec)}`}
								style={{
									label: {
										fill: "black",
										fontWeight: 500,
										fontSize: 13
									}
								}}
							/>
						</Charts>
					</ChartRow>
				</ChartContainer>
				<div style={timeStyle}>
					{this.state.tracker ? `${df(this.state.tracker)}` : ""}
				</div>
			</div>
		);
	}
}

export default Chart;
