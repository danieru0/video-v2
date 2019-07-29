import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import videoReducer from './videoReducer';
import alertReducer from './alertReducer';
import playlistReducer from './playlistReducer';
import adminReducer from './adminReducer';

export default combineReducers({
	authReducer,
	userReducer,
	videoReducer,
	alertReducer,
	playlistReducer,
	adminReducer
});