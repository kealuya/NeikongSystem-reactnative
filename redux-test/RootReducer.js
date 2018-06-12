import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import LogoutReducer from './LogoutReducer';

const rootReducer = combineReducers({
     LogoutReducer,LoginReducer
});

export default rootReducer;
