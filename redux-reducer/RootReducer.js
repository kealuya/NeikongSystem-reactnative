import {combineReducers} from 'redux';
import LoginReducer from '../redux-reducer/LoginReducer';
import ListReducer from '../redux-reducer/ListReducer';
import DetailReducer from '../redux-reducer/DetailReducer';

const rootReducer = combineReducers({
     LoginReducer,ListReducer,DetailReducer
});

export default rootReducer;
