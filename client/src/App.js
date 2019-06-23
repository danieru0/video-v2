import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

//import withAuth from './shared/hoc/withAuth';
import withoutAuth from './shared/hoc/withoutAuth';

import AuthContainer from './containers/AuthContainer';
import NavContainer from './containers/NavContainer';
import Head from './components/Head/Head';
import Upload from './components/Upload/Upload';

function App() {
	const AuthContainerWithoutAuth = withoutAuth(AuthContainer);
	return (
		<BrowserRouter>
			<div className="App">
				<NavContainer />
				<Switch>
					<Route exact path="/" component={Head}/>
					<Route path="/login" render={props => <AuthContainerWithoutAuth type="login" {...props} /> }/>
					<Route path="/register" render={props => <AuthContainerWithoutAuth type="register" {...props}/> }/>
					<Route path="/upload" component={Upload}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;