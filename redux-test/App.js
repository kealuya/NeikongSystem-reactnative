import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './CreatStore';

import ReduxTestMainNavigator from './ReduxTestMainNavigator';


const store = configureStore();

export default class App extends Component {


    componentDidMount(){
        
    }

    render() {
        return (
            <Provider store={store}>
                <ReduxTestMainNavigator />
            </Provider>
        );
    }
}

