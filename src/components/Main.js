//3rd party dependencies
import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";

//constants
import CHART_TIMESTAMPS from "../constants/chart-timestamps";

//my components
import Chart from "./Chart";

//redux actions
import * as actions from "../actions";

//style
import "./Main.css";

class Main extends Component {
	
	componentDidMount() {
		this.getChartData( this.props );
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.tsType !== nextProps.match.params.tsType) {
			this.getChartData(nextProps);
		}
	}

	/*a method for dispatching a fetch-chart-data action based on the current client route params
	should be called when the app is initially mounted (componentWillMount) of when the user navigates to a new tab (componentWillReceiveProps)*/
	getChartData(props) {
		const { match, fetchChartData } = props;
		/*the timestamp client-route is extracted from the url params
        which is then used to find the corresponding tsType*/
		const { tsType } = CHART_TIMESTAMPS.filter(
			ts => ts.clientRoute === match.params.tsType
		)[0];

		/*dispatch action to fetch chart data*/
		fetchChartData({ tsType });
	}

	render() {
		const { match, tsType, fetchChartData, data } = this.props;
		return (
			<Tabs value={match.params.tsType}>
				{CHART_TIMESTAMPS.map((ts, i) => (
					<Tab
						containerElement={<Link to={`/${ts.clientRoute}`} />}
						key={ts.tabLabel}
						label={ts.tabLabel}
						value={`${ts.clientRoute}`}
						onActive={() => fetchChartData({ tsType: ts.tsType })}
					>
						<div className="tab-content">
							{tsType && data.length && tsType === ts.tsType
								? <Chart data={data} tsType={tsType} />
								: <CircularProgress
										style={{ position: "relative", top: 100 }}
										size={350}
										thickness={20}
									/>}
						</div>
					</Tab>
				))}
			</Tabs>
		);
	}
}

//map redux store keys to app's props
const mapStateToProps = ({ chartData }) => ({
	tsType: chartData.tsType,
	data: chartData.data
});

//connect component to redux store
export default connect(mapStateToProps, { ...actions })(Main);
