import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import AuthContainer from './components/Auth/AuthContainer';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route path="/login" render={props => <AuthContainer type="login" {...props}/> }/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;
