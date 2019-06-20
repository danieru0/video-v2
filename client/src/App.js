import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

//import withAuth from './shared/hoc/withAuth';
import withoutAuth from './shared/hoc/withoutAuth';

import AuthContainer from './components/Auth/AuthContainer';

function App() {
	const AuthContainerWithoutAuth = withoutAuth(AuthContainer);
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route path="/login" render={props => <AuthContainerWithoutAuth type="login" {...props} /> }/>
					<Route path="/register" render={props => <AuthContainer type="register" {...props}/> }/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;