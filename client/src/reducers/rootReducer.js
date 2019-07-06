import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import videoReducer from './videoReducer';
import alertReducer from './alertReducer';

export default combineReducers({
	authReducer,
	userReducer,
	videoReducer,
	alertReducer
});