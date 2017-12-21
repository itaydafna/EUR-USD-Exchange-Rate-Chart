//dependencies
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Route, Redirect } from "react-router-dom";

//my components
import Main from "./components/Main";

//constants
import CHART_TIMESTAMPS from "./constants/chart-timestamps";


/*main application routes and MUI instantiation*/
const App = () => (
	<MuiThemeProvider>
		<div className="App">
			<Route path="/:tsType" component={Main} />
			<Route exact path="/" render={() => <Redirect to={`/${CHART_TIMESTAMPS[0].clientRoute}`} />} />
		</div>
	</MuiThemeProvider>
);

export default App;
