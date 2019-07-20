import React from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';

import withAuth from './shared/hocs/withAuth';
import withoutAuth from './shared/hocs/withoutAuth';
import withPlaylistAuth from './shared/hocs/withPlaylistAuth';

import AuthContainer from './containers/AuthContainer';
import NavContainer from './containers/NavContainer';
import Head from './components/Head/Head';
import Upload from './components/Upload/Upload';
import Watch from './components/Watch/Watch';
import Alert from './components/Alert/Alert';
import Search from './components/Search/Search';
import Favourites from './components/Favourites/Favourites';
import History from './components/History/History';
import Playlist from './components/Playlist/Playlist';
import User from './components/User/User';
import Videos from './components/Videos/Videos';

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
					<Route path="/search" component={Search}/>
					<Route path="/favourites" component={withAuth(Favourites)}/>
					<Route path="/history" component={withAuth(History)}/>
					<Route path="/:user/playlist/:id" component={withPlaylistAuth(Playlist)}/>
					<Route path="/user/:user/:page?" component={withRouter(User)}/>
					<Route path="/videos" component={withAuth(Videos)}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;