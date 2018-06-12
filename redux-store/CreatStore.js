import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux-reducer/RootReducer';
import isOnlineMiddleware from './isOnlineMiddleware';
//
const logger = store => next => action => {
    if(typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}


let middlewares = [
    isOnlineMiddleware,
    //logger,
    thunkMiddleware,
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}

