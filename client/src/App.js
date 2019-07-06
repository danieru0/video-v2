import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import withAuth from './shared/hocs/withAuth';
import withoutAuth from './shared/hocs/withoutAuth';

import AuthContainer from './containers/AuthContainer';
import NavContainer from './containers/NavContainer';
import Head from './components/Head/Head';
import Upload from './components/Upload/Upload';
import Watch from './components/Watch/Watch';
import Alert from './components/Alert/Alert';

function App() {
	const AuthContainerWithoutAuth = withoutAuth(AuthContainer);
	return (
		<BrowserRouter>
			<div className="App">
				<Alert />
				<NavContainer />
				<Switch>
					<Route exact path="/" component={Head}/>
					<Route path="/login" render={props => <AuthContainerWithoutAuth type="login" {...props} /> }/>
					<Route path="/register" render={props => <AuthContainerWithoutAuth type="register" {...props}/> }/>
					<Route path="/upload" component={withAuth(Upload)}/>
					<Route path="/watch/:id" component={Watch}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;