import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import videoReducer from './videoReducer';

export default combineReducers({
	authReducer: authReducer,
	userReducer: userReducer,
	videoReducer
});